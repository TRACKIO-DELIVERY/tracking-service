import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";
import { Directions } from "../Directions";

export function Map() {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "";

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        style={{ width: "100%", height: "100vh" }}
        defaultCenter={{ lat: -6.146837279661337, lng: -38.20538841712638 }}
        defaultZoom={17}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <Directions />
      </GoogleMap>
    </APIProvider>
  );
}
