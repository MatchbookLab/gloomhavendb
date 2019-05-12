export interface MapLocation {
  number: number;
  name: string;
  imageUrl: string;
  width: number;
  height: number;
  mapPosition: MapPosition;
  relativeNumberPosition: MapPosition;
  relativeCheckboxPosition: MapPosition;
}

export interface MapPosition {
  top: number;
  left: number;
}
