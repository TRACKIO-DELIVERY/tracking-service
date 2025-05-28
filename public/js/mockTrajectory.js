const trajetoMockado = [
  { lat: -23.5618, lng: -46.6562 },
  { lat: -23.5616, lng: -46.6559 },
  { lat: -23.5614, lng: -46.6556 },
  { lat: -23.5612, lng: -46.6553 },
  { lat: -23.561, lng: -46.655 },
  { lat: -23.5608, lng: -46.6547 },
];

export function startMockTrajectory(map) {
  const socket = io();
  const orderId = 'mock-order-1';

  const marker = new google.maps.Marker({
    position: trajetoMockado[0],
    map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: '#00f',
      fillOpacity: 1,
      strokeWeight: 1,
    },
  });

  let current = 0;
  const path = new google.maps.Polyline({
    path: [trajetoMockado[0]],
    strokeColor: 'blue',
    map,
  });

  const interval = setInterval(() => {
    current++;
    if (current >= trajetoMockado.length) {
      clearInterval(interval);
      return;
    }

    const pos = trajetoMockado[current];

    socket.emit('location_update', {
      orderId,
      coords: {
        latitude: pos.lat,
        longitude: pos.lng,
      },
    });

    marker.setPosition(pos);
    path.getPath().push(pos);
    map.panTo(pos);
  }, 3000);
}
