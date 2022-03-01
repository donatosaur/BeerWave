/**
 * Contains types used in ./utils
 * 
 * These are a mix of API response types from PunkAPI (see https://punkapi.com/documentation/v2)
 * and of responses returned by the heuristic algorithm
 */

// ------------------------------------- API Error Response ------------------------------------- 

/** Error response format for PunkAPI calls */
export interface PunkAPIErrorJSON {
  statusCode: number;
  error: string;
  message: string;
  data?: {
    location?: string;
    param?: string;
    msg?: string;
    value?: string;
  }[];
}

export function isPunkAPIErrorJSON (obj: any): obj is PunkAPIErrorJSON {
  obj = obj as PunkAPIErrorJSON;
  return !!obj.statusCode && !!obj.error && !!obj.message;
}


// ------------------------------------- API Data Response -------------------------------------- 

// Mixins to reduce code duplication
export interface BeerJSON {
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
  ibu: number | null;
  imageURL: string;
  foodPairing: string[];
}

/**
 * Represents beer pairing data
 */
export interface PairingJSON extends BeerJSON {
  matchingTerms: {
    [key: string]: number
  };
  matchScore: number;
}

/**
 * Represents plot values as key-value JSON objects
 */
export interface PlotValues {
  label: string;
  value: number;
}

/**
 * Represents request data sent to Plot microservice
 */ 
export interface PlotJSON {
  title: string;
  x_label: string;
  y_label: string;
  type: 'bar' | 'pie';
  values: PlotValues[];
}


export interface MatchData {
  styleSummaryData: PlotValues[];
  flavorSummaryData: PlotValues[];
  pairings: PairingJSON[];
}
