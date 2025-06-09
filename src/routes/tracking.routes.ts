import { Router } from 'express';
import {
  getTrackingCoords,
  renderDeliveryMap,
  setDeliverPerson,
} from '../controllers/trackingControllers.js';

const router = Router();

router.get('/map/:orderId', renderDeliveryMap);
router.post('/track/set-deliver-person', setDeliverPerson);
router.get('/track/route-preview', getTrackingCoords);

export default router;
