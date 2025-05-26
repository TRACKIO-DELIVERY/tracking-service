import { Router } from 'express';
import {
  renderDeliveryMap,
  setDeliverPerson,
} from '../controllers/trackingControllers.js';

const router = Router();

router.get('/map/:orderId', renderDeliveryMap);
router.post('/track/set-deliver-person', setDeliverPerson);
//rota de preview da rota do mapa

export default router;
