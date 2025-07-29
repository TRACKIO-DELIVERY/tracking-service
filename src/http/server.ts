import express from 'express';
import http from 'http';

//import '../broker/consumer/acceptedOrderConsumer.ts'

import { setupSocket } from '../config/socket.ts';
import { env } from '../config/env.ts';
import trackingRoutes from '../routes/tracking.routes.ts';

import path from 'path';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.resolve('public')));
app.use('/api/', trackingRoutes);

setupSocket(server);

const PORT = env.PORT || 3000;
server.listen(PORT,  () => {
  console.log(`Servidor ouvindo na porta: ${PORT}`);
});
