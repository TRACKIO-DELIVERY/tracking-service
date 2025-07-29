import { Server as HttpServer } from 'http';
import { registerTrackingSocket } from '../sockets/trackingSockets.ts';

export function setupSocket(server: HttpServer) {
  registerTrackingSocket(server);
}
