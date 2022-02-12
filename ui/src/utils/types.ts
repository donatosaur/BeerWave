export interface PairingJSON {
  'id': number;
  'name': string;
  'tagline': string;
  'description': string;
  'abv': number;
  'ibu': number;
  'image_url': string;
  'food_pairing': string[];
  'brewers_tips': string;
  'contributed_by': string;
  'match_score': number;
}


interface PunkAPIErrorData {
  'location'?: string;
  'param'?: string;
  'msg'?: string;
  'value'?: string;
}

export interface PunkAPIErrorJSON {
  'statusCode': number;
  'error': string;
  'message': string;
  'data'?: PunkAPIErrorData[];
}
