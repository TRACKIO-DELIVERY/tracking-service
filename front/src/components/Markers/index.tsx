import { Marker } from "@vis.gl/react-google-maps";

export type Poi = {
  key: string;
  location: google.maps.LatLngLiteral;
};

type MarkersType = {
  locations: Poi[];
};
export function Markers({ locations }: MarkersType) {
  return (
    <>
      {locations.map((local: Poi) => (
        <Marker key={local.key} position={local.location} />
      ))}
    </>
  );
}
