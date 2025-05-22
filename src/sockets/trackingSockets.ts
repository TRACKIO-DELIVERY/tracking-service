import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export function registerTrackingSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: '*', // pode restringir em produção
    },
  });

  io.on('connection', (socket) => {
    console.log(`Nova conexão: ${socket.id}`);

    // Entra em uma sala baseada no ID do pedido
    socket.on('join_order', ({ orderId }: { orderId: string }) => {
      socket.join(orderId);
      console.log(`${socket.id} entrou na sala ${orderId}`);
    });

    // Atualização de localização do entregador
    socket.on(
      'location_update',
      ({
        orderId,
        coords,
      }: {
        orderId: string;
        coords: { latitude: number; longitude: number };
      }) => {
        socket.to(orderId).emit('location_update', coords);
        console.log(
          `latitude: ${coords.latitude}, longitude: ${coords.longitude}`,
        );
      },
    );

    socket.on('disconnect', () => {
      console.log(`Desconectado: ${socket.id}`);
    });
  });
}
