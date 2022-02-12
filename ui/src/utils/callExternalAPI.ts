import { PunkAPIErrorJSON } from './types';

const BEER_API_URL = 'https://api.punkapi.com/v2/beers'

/**
 * Gets a specific beer object based on its ID
 * 
 * @param id the id of the beer to retrieve
 */
export async function getByID(id: number): Promise<object> {
  // make a request for the beer object with the specified id
  const response = await fetch(`${BEER_API_URL}/${id}`);
  if (!response.ok) {
    return await response.json() as PunkAPIErrorJSON;
  }

  // if the request was successful, parse and return it; it should be a JSON array of exactly one object
  const parsed_response = response.json();
  return parsed_response instanceof Array ? parsed_response[0] : parsed_response;
}

/**
 * Gets an array of beer objects based on fuzzy search terms.
 * 
 * Queries the external punkapi database for:
 *   - flavors mentioned in food pairings
 *   - styles mentioned in names
 *   - 
//  */
// export async function getByFuzzySearch(abv: number): Promise<object> {
//   // make a request with some fuzzy search terms
//   return Promise(false);
//   /**
//    * It's a bit awkward, but spices are located in 'hops' in the external database, so we can search
//    * for flavors there too. The PunkAPI documentation indicates the following types/descriptions for
//    * what we're searching on:
//    * 
//    * 
//    */

//   /**
//    * abv_lt
//    * ibu_lt
//    * ibu_gt
//    * 
//    * beer_name  (partial match)
//    * 
//    * food -->
//    * 
//    */



// }