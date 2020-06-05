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

export interface EventTargetObject {
  target : Target
}

export interface Target {
  value: string;
  getData: Function;
  getGeometry: Function;
}