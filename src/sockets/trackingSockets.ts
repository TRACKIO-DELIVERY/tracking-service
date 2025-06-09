import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;

export function registerTrackingSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: '*', // pode restringir em produção
    },
  });

  io.on('connection', (socket) => {
    console.log(`Nova conexão: ${socket.id}`);

    // Entra em uma sala baseada no ID do pedido
    socket.on(`join_order`, ({ orderId }: { orderId: string }) => {
      socket.join(orderId);
      console.log(`${socket.id} entrou na sala ${orderId}`);
    });

    // Atualização de localização do entregador
    socket.on(
      'location_update',
      (data: {
        orderId: string;
        coords: { latitude: number; longitude: number };
      }) => {
        const { orderId, coords } = data;
        socket.to(orderId).emit('location_update', coords);
        console.log(
          `latitude: ${coords.latitude}, longitude: ${coords.longitude}`,
        );
      },
    );

    //sala que emite quando a rota pode ser iniciada
    socket.on('route_ready', (orderId: string, deliverPerson: string) => {
      socket.join(orderId);
    });

    socket.on('disconnect', () => {
      console.log(`Desconectado: ${socket.id}`);
    });
  });
}

export function getIO() {
  if (!io) throw new Error('Socket não inicializado');
  return io;
}
