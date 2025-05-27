export interface Coord {
  latitude: string;
  longitude: string;
}

export interface Order {
  id: string;
  origin: Coord;
  destination: Coord;
}
