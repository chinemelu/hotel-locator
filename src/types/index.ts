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

export const ensurePossiblyNullValueReturnsObject = <T>(
  argument: T | undefined | null
): any => {
  if (argument === undefined || argument === null) {
    return {};
  }
  return argument;
};
