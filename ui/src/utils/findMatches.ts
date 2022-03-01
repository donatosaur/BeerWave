import { type PairingJSON, type BeerJSON, type MatchData, isPunkAPIErrorJSON } from './types';
import * as callExternalAPI from './callExternalAPI';

type matchingTermsType = {[key: string]: number};

/**
 * Gets an array of beer objects based on a fuzzy search including the passed terms, with a heuristic applied.
 * 
 * @param styles an array of strings representing beer styles
 * @param flavors an array of strings representing flavors
 * @param abv the maximum ABV to search for (0 for no limit)
 */
export async function findMatches(styles: string[], flavors: string[], abv: number = 0): Promise<MatchData> {
  /**
   * The API will return a whole bunch of information in a JSON array, most of which we're not
   * actually interested in. What we are interested in is the following:
   *  1. Identifying information for the beer that we can search and/or display:
   *     id, name, tagline, description, abv, ibu, image_url, food_pairings
   * 
   *  2. Anything else that we could search:
   *     brewers_tips, ingredients?.hops?.name
   * 
   *  Also, we may receive duplicate results, so we can use the returned ids to filter those out.
   */
  // make the queries
  const promises = await callExternalAPI.getByFuzzySearch(styles, flavors, abv);

  // hold onto any rejected responses; if we get nothing but errors, we can search this for a reason
  const errorResponses: string[] = [];

  // examine the result of each query and store data; if we get multiple hits of the same result, we only want one
  const beers = new Map<number, BeerJSON>();

  /**
   * We need to await an array of promises here to guarantee that the thread is blocked until each promise
   * resolves and is processed. In order to block execution until each of the promises has resolved, we
   * need to call Promise.all() on an array of promises.
   * 
   * For a really good explanation of this quirk: https://gist.github.com/joeytwiddle/37d2085425c049629b80956d3c618971
   */
  await Promise.all(promises.map(async (promise) => {
    if (promise.status === 'fulfilled' && promise.value.ok) {
      // check whether the API call itself was successful...
      const response = await promise.value.json();
      if (isPunkAPIErrorJSON(response)) {
        errorResponses.push(response.message);
      // ... and whether it's actually a JSON array
      } else if (response instanceof Array) {
        response.forEach((potentialMatch) => {
          if (!!potentialMatch.id && !beers.has(potentialMatch.id)) {
            // grab the relevant information from the potential match and store it
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

  // do we have at least one result to work with?
  if (beers.size === 0) {
    // todo: figure out what happened, return an error
    return Promise.reject('No beers found.');
  }

  // at this point, we've got pairing(s), so apply the heuristic
  return applyHeuristic(styles, flavors, beers);
}

/**
 * Supplies an array of PairingJSON objects, sorted in decreasing order of match score. The heuristic
 * applied is intended to weigh beers with a style match above equivalent beers with no style match,
 * and likewise beers with more matching flavors above those with less.
 * 
 * The heuristic is on a scale from 1 to 100 and simply weighted as follows:
 *  - 20% - matching style
 *  - 80% - matching flavors
 * 
 */
function applyHeuristic(styles: string[], flavors: string[], beers: Map<number, BeerJSON>): MatchData {
  /**
   * For convenience, we can store the data we need to weight the heuristic in a map. We'll need to store:
   *   - whether the beer had a style match (boolean)
   *   - how many of the flavors were found in the food pairings array (number)
   * 
   * key: beer id; value: [matchedStyle?, numFlavorMatches]
   */
  const beerInfo = new Map<number, [boolean, number]>();
  let maxMatchingFlavors = 0;  // we can use this to adjust the weights later

  /**
   * We also need to store the total matches for each search term so that we can return that data as well
   * 
   * key: search term; value: 
   */
  const styleSummary = new Map<string, number>();
  const flavorSummary = new Map<string, number>();

  // first pass: determine and store the number of matching styles and flavors
  const pairings: PairingJSON[] = [];
  beers.forEach((beer) => {
    // initialize values for beerInfo
    let matchedStyle = false;
    let numMatchingFlavors = 0;

    // destructure the object so we can rebuild it into a pairingJSON object later
    const matchingTerms: matchingTermsType = {};
    styles.forEach((style) => {
      // styles are matched against names
      const searchTerm = new RegExp(style, 'gi');  // construct a regex that is global (/g) and case-insensitive (/i)

      // check whether the style is found in the beer's name
      if (searchTerm.test(beer?.name ?? '')) {
        matchingTerms[style] = 1;  // for now, this can only be 1 since we're just searching the name
        matchedStyle = true;       // we matched at least one style on this beer

        // keep track of summary data
        styleSummary.set(style, (styleSummary.get(style) ?? 0) + 1);
      } else {
        matchingTerms[style] = 0;
      }
    });
    flavors.forEach((flavor) => {
      // flavors are matched against food pairings; pairings is an array of strings: first we need
      // to get the number of matches in each substring, then we can sum them (using reduce)
      const searchTerm = new RegExp(flavor, 'gi');
      const matchArray = beer.foodPairing.map((pairing) => pairing?.match(searchTerm)?.length ?? 0);
      matchingTerms[flavor] = matchArray.reduce((prev, curr) => prev + curr);
      numMatchingFlavors += matchingTerms[flavor];

      // keep track of summary data
      if (matchingTerms[flavor] > 0) {
        flavorSummary.set(flavor, (styleSummary.get(flavor) ?? 0) + matchingTerms[flavor]);
      }
    });

    // set the info and keep track of the max matches
    beerInfo.set(beer.id, [matchedStyle, numMatchingFlavors])
    maxMatchingFlavors = Math.max(maxMatchingFlavors, numMatchingFlavors);

    // reconstruct the pairing object and store it
    const pairing: PairingJSON = {
      ...beer,
      matchingTerms,
      matchScore: 0,  // intiialized to 0, we'll calculate this later
    };
    pairings.push(pairing);
  });

  // second pass: determine the match score for each beer
  pairings.forEach((pairing) => {
    // we should never actually fail to retrieve by id, but we should have default values here for safety
    const [matchedStyle, numFlavorMatches] = beerInfo.get(pairing.id) ?? [false, 0];
    pairing.matchScore += matchedStyle ? 20 : 1;  // 20 points for a style match; 1 point min for the scale
    
    /**
     * The flavor portion of the match score needs fine tuning. For now, it's calculated like so:
     *   - max num of matches <= 1 (yikes) gets 50 points for a match and 0 for no match
     *   - anything above that, scales (stretched up to 5) between 50 and 80 for >= 1 match, and 0 for no match
     */
    if (numFlavorMatches > 0) {
      let scale;
      switch (maxMatchingFlavors) {
      case 2:
        scale = 25;
        break;
      case 3:
        scale = 10;
        break;
      // case 4:
      //   scale = 10;
      //   break;
      default:
        scale = 7;
        pairing.matchScore += 2; // otherwise the spread is 28 instead of 30
        break;
      }
      // if we get here, there's at least one match, so add 50 first, then multiply the scale by the balance
      pairing.matchScore += 50 + scale * Math.min(4, (numFlavorMatches - 1));
    }
  });

  console.log(flavorSummary);

  // sort the pairings in descending order by match score & get the summary data in the right format
  return { 
    styleSummaryData: Array.from(styleSummary.entries()).map(([label, value]) => ({label, value})),
    flavorSummaryData: Array.from(flavorSummary.entries()).map(([label, value]) => ({label, value})), 
    pairings: pairings.sort((first, second) => (second.matchScore - first.matchScore)),
  };
}
