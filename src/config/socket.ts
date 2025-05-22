import { Server as HttpServer } from 'http';
import { registerTrackingSocket } from '../sockets/trackingSockets.js';

export function setupSocket(server: HttpServer) {
  registerTrackingSocket(server);
}
