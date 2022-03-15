import * as callExternalAPI from './callExternalAPI';
import { 
  type PairingJSON,
  type BeerJSON,
  type MatchData,
  type PlotValues,
  isPunkAPIErrorJSON
} from './types';

type beerInfoMap = Map<number, [boolean, number]>;
type beerJSONMap = Map<number, BeerJSON>;

/**
 * Gets an array of beer objects based on a fuzzy search of styles/flavors, with a heuristic applied
 * 
 * @param styles an array of strings representing beer styles
 * @param flavors an array of strings representing flavors
 * @param abv the maximum ABV to search for (0 for no limit)
 */
export async function findMatches(
  styles: string[],
  flavors: string[],
  abv: number = 0
): Promise<MatchData> {
  const promises = await callExternalAPI.getByFuzzySearch(styles, flavors, abv);
  const beers = new Map<number, BeerJSON>();
  let errorResponse: string | Error = '';

  // array guarantees blocking (see gist.github.com/joeytwiddle/37d2085425c049629b80956d3c618971)
  await Promise.all(promises.map(async (promise) => {
    if (promise.status === 'fulfilled' && promise.value.ok) {
      const response = await promise.value.json();

      if (isPunkAPIErrorJSON(response)) {
        errorResponse = new Error(response.message);
      // check whether the API call returned an array as expected
      } else if (response instanceof Array) {
        response.forEach((potentialMatch) => {
        // the API returns information we're not interested in, so we need to filter it
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

  return beers.size > 0 ? applyHeuristic(styles, flavors, beers) : Promise.reject(errorResponse);
}


/**
 * Applies a heuristic to score matches on a scale from 1 to 100
 * 
 * @return PairingJSON object sorted in decreasing order and summary data for matched terms
 */
function applyHeuristic(styles: string[], flavors: string[], beers: beerJSONMap): MatchData {
  const beerInfo = new Map<number, [boolean, number]>();  // beerID -> num styles, num flavors
  const styleSummary = new Map<string, number>();         // style -> num matching beers
  const flavorSummary = new Map<string, number>();        // flavors -> num matching beers
  const pairings: PairingJSON[] = [];

  // determine and store the number of matching styles and flavors, respectively
  beers.forEach((beer) => {
    const pairing: PairingJSON = { ...beer, matchingTerms: {}, matchScore: 0 };

    const numMatchedStyles = matchTerms(styles, pairing, beer.name, styleSummary);
    const numMatchedFlavors = matchTerms(flavors, pairing, beer.foodPairing, flavorSummary);

    beerInfo.set(beer.id, [numMatchedStyles > 0, numMatchedFlavors]);
    pairings.push(pairing);
  });

  calculateMatchScore(beerInfo, pairings);

  // sort the pairings in descending order by match score & get the summary data in the right format
  return { 
    styleSummaryData: summaryMapToArray(styleSummary),
    flavorSummaryData: summaryMapToArray(flavorSummary), 
    pairings: pairings.sort((first, second) => (second.matchScore - first.matchScore)),
  };
}


/** ------------------------------------------ Helpers ------------------------------------------ */

/**
 * Finds the number of times each term appears in searchSpace. Each corresponding key in summaryMap
 * is updated to reflect the new total, and the passed pairing object is modified with a new key
 * contaning this total as its value.
 * 
 * @param terms terms to search for
 * @param pairing pairing object to be modified
 * @param searchSpace space to search for terms in
 * @param summaryMap map of term-number key-value pairs to be modified
 * @returns the total number of times any term in terms appears in searchSpace
 */
function matchTerms(
  terms: string[],
  pairing: PairingJSON,
  searchSpace: string | string[],
  summaryMap: Map<string, number>,
): number {
  let numMatchingTerms = 0;

  terms.forEach((term) => {
    pairing.matchingTerms[term] = findNumMatches(term, searchSpace ?? '');
    numMatchingTerms += pairing.matchingTerms[term];

    // keep track of summary data
    if (pairing.matchingTerms[term] > 0) {
      summaryMap.set(term, (summaryMap.get(term) ?? 0) + pairing.matchingTerms[term]);
    }
  });
  return numMatchingTerms;
}

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
    const matches = searchSpace.map(value => value.match(searchTerm)?.length ?? 0);
    return matches.reduce((prev, curr) => prev + curr);
  }
}


/**
 * Calculates the match score of each pairing. Scores are determined based on the value in beerInfo
 * and written to each pairing in place as pairing.matchScore
 */
function calculateMatchScore(beerInfo: beerInfoMap, pairings: PairingJSON[]): void {
  pairings.forEach((pairing) => {
    const [matchedStyle, numFlavorMatches] = beerInfo.get(pairing.id) ?? [false, 0];
    // style match score: 20% weight
    pairing.matchScore += matchedStyle ? 20 : 0;
    // flavor match score: 80% weight (40 points for 1 match, 10 points for each additional up to 4)
    pairing.matchScore += numFlavorMatches > 0 ? 40 + Math.min(numFlavorMatches - 1, 4) * 10 : 0;
  });
}
