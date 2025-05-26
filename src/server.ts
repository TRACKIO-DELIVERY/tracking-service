import express from 'express';
import http from 'http';
import { setupSocket } from './config/socket.js';
import { env } from './config/env.js';
import trackingRoutes from './routes/tracking.routes.js';
import { GeocodeService } from './services/GeocodeService.js';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static('public'));
app.use('/', trackingRoutes);

setupSocket(server);
//iniciar aqui tambem o consumer do rabbit

const PORT = env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
