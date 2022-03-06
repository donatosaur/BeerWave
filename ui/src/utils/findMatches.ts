import * as callExternalAPI from './callExternalAPI';
import { 
  type PairingJSON,
  type BeerJSON,
  type MatchData,
  type PlotValues,
  isPunkAPIErrorJSON
} from './types';

/**
 * Gets an array of beer objects based on a fuzzy search including the passed terms, with a heuristic applied
 * 
 * @param styles an array of strings representing beer styles
 * @param flavors an array of strings representing flavors
 * @param abv the maximum ABV to search for (0 for no limit)
 */
export async function findMatches(styles: string[], flavors: string[], abv: number = 0): Promise<MatchData> {
  /**
   * The API returns information we're not interested in, so we need to filter it. All we want is any identifying info
   * to be searched through or display which are contained in {@link BeerJSON}, while avoiding duplicate beer results
   */
  const promises = await callExternalAPI.getByFuzzySearch(styles, flavors, abv);
  const errorResponses: string[] = [];
  const beers = new Map<number, BeerJSON>();

  // await an array to guarantee blocking (see https://gist.github.com/joeytwiddle/37d2085425c049629b80956d3c618971)
  await Promise.all(promises.map(async (promise) => {
    if (promise.status === 'fulfilled' && promise.value.ok) {
      const response = await promise.value.json();

      // check whether the API call itself was successful...
      if (isPunkAPIErrorJSON(response)) {
        errorResponses.push(response.message);
      // ... and whether it's actually a JSON array
      } else if (response instanceof Array) {
        response.forEach((potentialMatch) => {
          if (!!potentialMatch.id && !beers.has(potentialMatch.id)) {
            const beer: BeerJSON = {
              id: potentialMatch.id,
              name: potentialMatch.name,
              tagline: potentialMatch.tagline,
              description: potentialMatch.description,
              abv: potentialMatch.abv,
              ibu: potentialMatch.ibu,
              imageURL: potentialMatch.image_url,
              foodPairing: potentialMatch.food_pairing,
            }
            beers.set(potentialMatch.id, beer);
          }
        });
      }
    }
  }));

  return beers.size > 0 ? applyHeuristic(styles, flavors, beers) : Promise.reject(new Error(errorResponses[0]));
}


/**
 * Applies a heuristic to score matches from 1 to 100 weighted 20% for matching style and 80% for matching flavors
 * 
 * @return PairingJSON objects sorted in decreasing order and summary data for search term matches found
 */
function applyHeuristic(styles: string[], flavors: string[], beers: Map<number, BeerJSON>): MatchData {
  const beerInfo = new Map<number, [boolean, number]>();  // beerID -> matched style, num matching flavors
  const styleSummary = new Map<string, number>();         // style -> num matching beers
  const flavorSummary = new Map<string, number>();        // flavors -> num matching beers
  const pairings: PairingJSON[] = [];

  //first pass: determine and store the number of matching styles and flavors, respectively
  beers.forEach((beer) => {
    const pairing: PairingJSON = { ...beer, matchingTerms: {}, matchScore: 0 };
    beerInfo.set(beer.id, [false, 0]);

    // match styles
    let matchedStyle = false;
    styles.forEach((style) => {
      pairing.matchingTerms[style] = Math.max(findNumMatches(style, beer?.name ?? ''), 1); // capped for now
      if (pairing.matchingTerms[style] > 0) {
        styleSummary.set(style, (styleSummary.get(style) ?? 0) + 1);  // keep track of summary data
        matchedStyle = true;                                          // we found at least one match
      }
    });

    // match flavors
    let numMatchingFlavors = 0;
    flavors.forEach((flavor) => {
      pairing.matchingTerms[flavor] = findNumMatches(flavor, beer?.foodPairing ?? '');
      numMatchingFlavors += pairing.matchingTerms[flavor];

      // keep track of summary data
      if (pairing.matchingTerms[flavor] > 0) {
        flavorSummary.set(flavor, (styleSummary.get(flavor) ?? 0) + pairing.matchingTerms[flavor]);
      }
    });

    beerInfo.set(beer.id, [matchedStyle, numMatchingFlavors])
    pairings.push(pairing);
  });

  // second pass: determine the match score for each beer
  calculateMatchScore(beerInfo, pairings);

  // sort the pairings in descending order by match score & get the summary data in the right format
  return { 
    styleSummaryData: summaryMapToArray(styleSummary),
    flavorSummaryData: summaryMapToArray(flavorSummary), 
    pairings: pairings.sort((first, second) => (second.matchScore - first.matchScore)),
  };
}


/** -------------------------------------------------- Helpers -------------------------------------------------- */

/**
 * Converts summary data from Map to a PlotValues array
 */
function summaryMapToArray(summaryMap: Map<string, number>): PlotValues[] {
  return Array.from(summaryMap.entries()).map(([label, value]) => ({label, value}));
}

/**
 * Finds the number of times term appears in searchSpace
 */
function findNumMatches(term: string, searchSpace: string | string[]): number {
  const searchTerm = RegExp(term, 'gi');  // match anywhere in string & case-insensitive
  if (typeof searchSpace === 'string') {
    return searchSpace.match(searchTerm)?.length ?? 0;
  } else {
    return searchSpace.map(value => value.match(searchTerm)?.length ?? 0).reduce((prev, curr) => prev + curr);
  }
}


/**
 * Calculates the match score of each pairing. Scores are determined based on the value in beerInfo and written
 * to each pairing in place (pairing.matchScore)
 */
function calculateMatchScore(beerInfo: Map<number, [boolean, number]>, pairings: PairingJSON[]): void {
  pairings.forEach((pairing) => {
    const [matchedStyle, numFlavorMatches] = beerInfo.get(pairing.id) ?? [false, 0];
    // style match score: 20% weight
    pairing.matchScore += matchedStyle ? 20 : 1;
    // flavor match score portion: 80% weight (32 points for 1 match, 12 points for each additional up to 4)
    pairing.matchScore += numFlavorMatches > 0 ? 32 + Math.min(numFlavorMatches - 1, 4) * 12 : 0;
  });
}
