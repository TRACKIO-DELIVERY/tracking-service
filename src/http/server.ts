import express from 'express';
import http from 'http';

import { setupSocket } from '../config/socket.ts';
import { env } from '../config/env.ts';
import { getLogger } from '../config/logging.ts';
import trackingRoutes from '../routes/tracking.routes.ts';

import promBundle from "express-prom-bundle"


import path from 'path';

const logging = getLogger()

const app = express();
const server = http.createServer(app);

//tracking
app.use(express.json());
app.use(express.static(path.resolve('public')));
app.use(trackingRoutes);

//socket
setupSocket(server);

//metricas
const metricsMiddleware = promBundle({includeMethod: true, includePath: true})
app.use(metricsMiddleware)

const PORT = env.PORT || 3000;
server.listen(PORT,  () => {
  logging.info('Starting server')
  
  console.log(`Servidor ouvindo na porta: ${PORT}`);
  console.log('Swagger em http://localhost/api/track/docs')
  console.log('Grafana em http://localhost:3001')
});
