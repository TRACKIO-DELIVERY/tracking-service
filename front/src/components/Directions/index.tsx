import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export function Directions() {
  const map = useMap();
  const routesLibrabry = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();

  //inicializa serviços de direções e renderização no mapa
  useEffect(() => {
    if (!map || !routesLibrabry) return;
    setDirectionsService(new routesLibrabry.DirectionsService());
    setDirectionsRenderer(new routesLibrabry.DirectionsRenderer({ map }));
  }, [map, routesLibrabry]);

  //desenha no mapa a rota entre destino e origem
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: { lat: -6.146837279661337, lng: -38.20538841712638 },
        destination: { lat: -6.145327875209893, lng: -38.20398830396341 },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      });
  }, [directionsService, directionsRenderer]);

  return null;
}
