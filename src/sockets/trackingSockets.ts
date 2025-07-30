import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;

export function registerTrackingSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: '*', 
    },
  });

  io.on('connection', (socket) => {
    console.log(`Nova conexão: ${socket.id}`);

    // -- Sala do pedido
    socket.on(`join_order`, (orderId) => {

      const room = `order-${orderId}`
      socket.join(room);

      console.log(`${socket.id} entrou na sala ${orderId}`);
    });

    // -- evento de enviar coords
    socket.on(
      'location_update',
      (data: {
        orderId: string;
        coords: { latitude: number; longitude: number };
      }) => {
        const { orderId, coords } = data;
        
        const room = `order-${orderId}`
        console.log(
          `latitude: ${coords.latitude}, longitude: ${coords.longitude}`,
        );

        // -- server envia para todos nessa sala (a web)
        io.to(room).emit("location_update", coords )
      },
    );

    socket.on('route_ready', (orderId: string, deliverPerson: string) => {
      
      const room = `order-${orderId}`
      io.to(room).emit("route_ready", () => {
        console.log("Rota pronta")
      })

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
