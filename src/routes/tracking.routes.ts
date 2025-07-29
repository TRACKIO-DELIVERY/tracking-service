import { Router } from 'express';
import {
  acceptedOrder,
  getHealth,
  getTrackingCoords,
  renderDeliveryMap,
  sendOrderToAccptedQueue,
  sendOrderToFinishidQueue,
  sendOrderToInRouteQueue,
  startRoute,
} from '../controllers/trackingControllers.ts';

const router = Router();

router.get('/track/health', getHealth);
router.get('/track/map/:orderId', renderDeliveryMap);
router.get('/track/route-preview', getTrackingCoords);
router.post('/track/accepted-order', acceptedOrder)
router.post('/track/start-route', startRoute)
router.post('/track/queue/accepted', sendOrderToAccptedQueue)
router.post('track/queue/in-route', sendOrderToInRouteQueue)
router.post('track/queue/finished', sendOrderToFinishidQueue)

export default router;
