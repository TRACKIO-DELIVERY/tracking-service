import { getIO } from '../sockets/trackingSockets.ts';

export function processAcceptedOrder(data: any) {
  console.log(data);
  //aqui emitir talvez? quando a rota estiver pronta
  const io = getIO();
  //io.emit('route_ready').{data.id}
}
