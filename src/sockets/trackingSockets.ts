import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { getLogger } from '../config/logging.ts';

let io: Server;

const logger = getLogger()

export function registerTrackingSocket(server: HttpServer) {
  io = new Server(server, {
    path: '/track/socket.io/',
    cors: {
      origin: '*', 
    },
  });

  io.on('connection', (socket) => {
    logger.info('A socket is connected')
    console.log(`Nova conexão: ${socket.id}`);

    // -- Sala do pedido
    socket.on(`join_order`, (orderId) => {
      logger.info(`Sockets joined order: ${orderId} room`)
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
        logger.info(`Socket room to order: ${orderId} is ready`)
        console.log("Rota pronta")
      })

    });

    socket.on('disconnect', () => {
      logger.info('A socket was disconected')
      console.log(`Desconectado: ${socket.id}`);
    });
  });
}

export function getIO() {
  if (!io) throw new Error('Socket não inicializado');
  return io;
}
