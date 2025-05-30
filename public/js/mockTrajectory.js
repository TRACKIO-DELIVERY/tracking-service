let deliverMarker = null;
export function startMockTrajectory(map, orderId = 1) {
  const socket = io();
  socket.on('connect', () => {
    console.log('Conectado ao servidor de rastreamento');

    //sala do pedido
    socket.emit('join_order', { orderId });
  });

  //recebendo coords do app
  socket.on('location_update', (coords) => {
    const { latitude, longitude } = coords;

    const position = { lat: latitude, lng: longitude };

    if (!deliverMarker) {
      deliverMarker = new google.maps.Marker({
        position,
        map,
        title: 'Entregador',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#FF0000',
          fillOpacity: 1,
          strokeWeight: 1,
        },
      });
    } else {
      //att a posição do marcador
      deliverMarker.setPosition(position);
    }

    console.log('Atualização de posição recebida:', position);
  });
}
