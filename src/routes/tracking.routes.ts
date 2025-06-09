import { Router } from 'express';
import {
  getHealth,
  getTrackingCoords,
  renderDeliveryMap,
  setDeliverPerson,
} from '../controllers/trackingControllers.ts';

const router = Router();

router.get('/track/health', getHealth);
router.get('/track/map/:orderId', renderDeliveryMap);
router.post('/track/set-deliver-person', setDeliverPerson);
router.get('/track/route-preview', getTrackingCoords);

export default router;
