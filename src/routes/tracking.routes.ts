import { Router } from 'express';
import { renderDeliveryMap } from '../controllers/trackingControllers.js';

const router = Router();

router.get('/map/:orderId', renderDeliveryMap);
//rota de preview da rota do mapa
//rota do id e entregador associado ??

export default router;
