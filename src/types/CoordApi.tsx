export interface Root {
  results: Result[];
}

export interface Result {
  type: string;
  id: string;
  score: number;
  entityType?: string;
  address: Address;
  position: Position;
}

export interface Address {
  municipality: string;
  countrySubdivision: string;
  countryCode: string;
  country: string;
  countryCodeISO3: string;
  freeformAddress: string;
  municipalitySubdivision?: string;
  streetNumber?: string;
  streetName?: string;
  postalCode?: string;
  extendedPostalCode?: string;
  localName?: string;
  countrySecondarySubdivision?: string;
  countrySubdivisionName?: string;
  countrySubdivisionCode?: string;
}

export interface Position {
  lat: number;
  lon: number;
}

export default Root;
