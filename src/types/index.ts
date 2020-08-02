/* eslint-disable  @typescript-eslint/no-explicit-any */

export interface Platform {
  createDefaultLayers(): VectorObject;
}

export interface VectorObject {
  vector: NormalObject;
}

export interface NormalObject {
  normal: MapObject;
}

export interface MapObject {
  map: object;
}

export interface Address {
  label: string;
  countryCode: string;
  countryName: string;
  city: string;
  postalCode: string;
  state: string;
}
export interface MapView {
  west: number;
  south: number;
  east: number;
  north: number;
}
export interface Coordinates {
  lat: number;
  lng: number;
}
export interface Scoring {
  queryScore: number;
  fieldScore: FieldScore;
}
export interface FieldScore {
  city: number;
}
export interface HotelLocation {
  address: Address;
  id: string;
  localityType: string;
  mapView: MapView;
  position: Array<number>;
  resultType: string;
  scoring: Scoring;
  title: string;
  href: string;
  distance: number;
  vicinity: string;
}

export interface Map {
  addObject: Function;
  addObjects: Function;
  addEventListener(evt: string, callback: Function): void;
}

export interface HotelLocationResponse {
  success: boolean;
  response?: Response;
  error?: string;
}

export interface Response {
  data: Data;
}

export interface Data {
  media: Media;
  results: Results;
  items: Array<Items>;
}

export interface Media {
  images: Images;
}

export interface Images {
  available: number;
  items: Array<Items>;
}

export interface Results {
  items: Array<HotelLocation>;
}

export interface Items {
  position: Coordinates;
  src: string;
}

export interface AdditionalHotelDetailsResponse {
  response: Response;
}

export const ensurePossiblyNullValueReturnsObject = <T>(
  argument: T | undefined | null
): any => {
  if (argument === undefined || argument === null) {
    return {};
  }
  return argument;
};
