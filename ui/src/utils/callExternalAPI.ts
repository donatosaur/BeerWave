import type { PunkAPIErrorJSON, PlotJSON, PlotValues } from './types';

const BEER_API_URL = 'https://api.punkapi.com/v2/beers';
const PLOT_API_URL = 'http://localhost:8000/api/plot';


/**
 * Promise resolving to an array of settled promises
 */
type PromiseArray = Promise<PromiseSettledResult<Response>[]>;

/**
 * Gets a specific beer object based on its ID
 * 
 * @param id the id of the beer to retrieve
 */
export async function getByID(id: Array<number | string>): Promise<object> {
  const response = await fetch(`${BEER_API_URL}/${id}`);
  if (!response.ok) {
    return await response.json() as PunkAPIErrorJSON;
  }

  // successful requests should resolve to a JSON array of exactly one object
  const parsed_response = response.json();
  return parsed_response instanceof Array ? parsed_response[0] : parsed_response;
}

/**
 * Gets an array of beer objects based on a fuzzy search including the following terms:
 * 
 * The external API is limited to 3600 requests/hr.
 * There are a maximum of 5 values among styles, which results in a maximum of 5 requests.
 * There are a maximum of 5 values among flavors, but at worst that's 3 * 5 = 15 actual flavors (some map to 3).
 * 
 * At best:  3600 req/hr * 1 search /  2 req = 1800 searches/hr
 * At worst: 3600 req/hr * 1 search / 15 req =  240 searches/hr
 * 
 * @param styles an array of strings representing beer styles
 * @param flavors an array of strings representing flavors
 * @param abv the maximum ABV to search for (0 for no limit)
 */
export async function getByFuzzySearch(styles: string[], flavors: string[], abv: number = 0): PromiseArray {
  // build a list of query strings
  const queryStrings: string[] = [];
  styles.map((style) => queryStrings.push(`beer_name=${style}`));
  flavors.map((flavor) => queryStrings.push(`food=${flavor}`));

  // run and return a query for each, whether or not they're successful
  const responses = queryStrings.map((queryString) => {
    const url = abv > 0
      ? `${BEER_API_URL}?abv_lt=${abv + 0.01}&${queryString}`
      : `${BEER_API_URL}?${queryString}`

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

  return Promise.allSettled(responses);
}


/**
 * Gets a pie chart image (as a Blob) from the Plot API Microservice
 * 
 * @param title a title for the chart
 * @param values an array of objects containing label-value pair objects
 * 
 */
export async function getPiePlot(title: string, values: PlotValues[]): Promise<Blob> {

  const plotRequest: PlotJSON = { title, x_label: '', y_label: '', type: 'bar', values }
  const response = await fetch(PLOT_API_URL, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(plotRequest),
  });

  // parse and verify that we received an image
  if (!response.ok || !response.headers?.get('Content-Type')?.startsWith('image/')) {
    return Promise.reject(new Error('getPiePlot() fetch call failed'));
  }

  return response.blob();
}
