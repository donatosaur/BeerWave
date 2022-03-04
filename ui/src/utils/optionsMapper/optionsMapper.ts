import data from './data.json';

/** 
 * Flavor options to be presented to users for selection, sorted and mapped to their user-facing values 
 */
export const flavorOptions: string[] = Object.keys(data.mappedFlavors).concat(data.individualFlavors).sort();


/** 
 * Style options to be presented to users for selection 
 */
export const styleOptions: string[] = data.styles.sort();


/**
 * Maps user-selected {@link flavorOptions flavor options} to their search term values
 */
export function getFlavorSearchTerms(flavors: string[]): string[] {
  // tsc is a little overbearing here; if the value isn't one of the discrete options in mappedFlavors, it'll
  // be undefined at runtime and this code already checks for that; disable this compile-time check
  // @ts-expect-error
  return flavors.flatMap((value) => data.mappedFlavors?.[value] ?? value);
}
