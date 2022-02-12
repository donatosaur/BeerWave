import data from './data.json';

/**
 * Flavor options to be presented to users for selection.
 * 
 * Some flavors are stored as keys mapped to multiple search terms (mappedFlavors) and others are stored
 * as individual seach terms (individualFlavors). This merges all "user-facing" flavors into one array.
 * 
 * To obtain the actual search term,
 * 
 */
export const flavorOptions: string[] = Object.keys(data.mappedFlavors).concat(data.individualFlavors);

/**
 * Converts an array of flavor options to an array of flavor search terms.
 * 
 * @param flavors an array of flavor options
 * @see flavorOptions
 */
export function getFlavorSearchTerms(flavors: string[]): string[] {
  // disable ts error checking here for now; if value isn't one of the discrete options in mappedFlavors,
  // it'll be undefined at runtime in the compiled JS anyway, and we're already doing a check for that
  // @ts-expect-error
  const searchTerms = flavors.flatMap((value) => data.mappedFlavors?.[value] ?? value);
  return searchTerms;
}


/**
 * Style options to be presented to users for selection
 */
export const styleOptions: string[] = data.styles;
