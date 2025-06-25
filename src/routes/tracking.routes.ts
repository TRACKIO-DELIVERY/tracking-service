import { Router } from 'express';
import {
  getHealth,
  getTrackingCoords,
  renderDeliveryMap,
} from '../controllers/trackingControllers.ts';

const router = Router();

router.get('/track/health', getHealth);
router.get('/track/map/:orderId', renderDeliveryMap);
router.get('/track/route-preview', getTrackingCoords);

export default router;
