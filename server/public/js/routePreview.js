export function showRoutePreview(map, { origem, destino }) {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: 'blue',
    },
  });

  directionsRenderer.setMap(map);

  directionsService.route(
    {
      origin: origem,
      destination: destino,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);

        // Marcador de origem
        new google.maps.Marker({
          position: origem,
          map: map,
          label: 'A',
          title: 'Origem',
        });

        // Marcador de destino
        new google.maps.Marker({
          position: destino,
          map: map,
          label: 'B',
          title: 'Destino',
        });
      } else {
        console.error('Erro ao calcular rota:', status);
      }
    },
  );
}
