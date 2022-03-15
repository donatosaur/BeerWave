import data from './data.json';

type mappedFlavorsKey = keyof typeof data.mappedFlavors;

/** 
 * Flavor options to be presented to users for selection, sorted and mapped to user-facing values 
 */
export const flavorOptions = Object.keys(data.mappedFlavors).concat(data.individualFlavors).sort();


/** 
 * Style options to be presented to users for selection 
 */
export const styleOptions = data.styles.sort();

/**
 * Maps user-selected {@link flavorOptions flavor options} to their search term values
 */
export function getFlavorSearchTerms(flavors: string[]): string[] {
  return flavors.flatMap((value) => data.mappedFlavors?.[value as mappedFlavorsKey] ?? value);
}
