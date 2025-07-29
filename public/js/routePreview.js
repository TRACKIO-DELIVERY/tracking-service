

export async function showRoutePreview(map) {
  const coordsStored = localStorage.getItem('coords')
  const coords = JSON.parse(coordsStored)
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
      origin: coords.origin,
      destination: coords.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);

        // Marcador de origem
        new google.maps.Marker({
          position: coords.origin,
          map: map,
          label: 'A',
          title: 'Origem',
        });

        // Marcador de destino
        new google.maps.Marker({
          position: coords.destination,
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
