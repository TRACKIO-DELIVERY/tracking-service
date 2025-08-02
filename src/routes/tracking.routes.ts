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

import swaggerUi from 'swagger-ui-express'

import authenticateToken from '../middleware/authentication.ts';
import { swaggerSpec } from '../config/swagger.ts';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     OrderPayload:
 *       type: object
 *       required:
 *         - orderId
 *       properties:
 *         orderId:
 *           type: string
 *     QueueResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     StartRouteResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         orderId:
 *           type: string
 *         canStartSendingLocation:
 *           type: boolean
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */


router.get('/track/health', getHealth);

/**
 * @openapi
 * /track/map/:orderId:
 *   get:
 *     summary: Serve o mapa estático de um pedido
 *     tags:
 *       - Mapa  
 */
router.get('/track/map/:orderId', renderDeliveryMap);

/**
 * @openapi
 * /track/route-preview:
 *   post:
 *     summary: Retorna as coordenadas de um pedido
 *     tags:
 *       - Mapa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 coords:
 *                   type: object
 *                   properties:
 *                     origin:
 *                       type: object
 *                       properties:
 *                         lat:
 *                           type: number
 *                         lng:
 *                           type: number
 *                     destination:
 *                       type: object
 *                       properties:
 *                         lat:
 *                           type: number
 *                         lng:
 *                           type: number
 */

router.post('/track/route-preview', getTrackingCoords);

/**
 * @openapi
 * /track/accepted-order:
 *   post:
 *     summary: Emite evento para que rota seja exibida no mapa
 *     tags:
 *       - Tracking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderPayload'
 *     responses:
 *       200:
 *         description: Ordem aceita
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QueueResponse'
 */
router.post('/track/accepted-order', authenticateToken, acceptedOrder)

/**
 * @openapi
 * /track/start:
 *   post:
 *     summary: Inicia uma rota (depois que entregador aceita)
 *     tags:
 *       - Tracking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderPayload'
 *     responses:
 *       200:
 *         description: Rota iniciada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StartRouteResponse'
 *       404:
 *         description: Ordem não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/track/start-route', authenticateToken, startRoute)

/**
 * @openapi
 * /track/queue/accepted:
 *   post:
 *     summary: Envia pedido para a fila "accepted"
 *     tags:
 *       - Filas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderPayload'
 *     responses:
 *       200:
 *         description: Pedido enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QueueResponse'
 *       400:
 *         description: Erro ao enviar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/track/queue/accepted', authenticateToken, sendOrderToAccptedQueue)

/**
 * @openapi
 * /track/queue/in-route:
 *   post:
 *     summary: Envia pedido para a fila "in-route"
 *     tags:
 *       - Filas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderPayload'
 *     responses:
 *       200:
 *         description: Pedido enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QueueResponse'
 *       400:
 *         description: Erro ao enviar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/track/queue/in-route', authenticateToken, sendOrderToInRouteQueue)

/**
 * @openapi
 * /track/queue/finished:
 *   post:
 *     summary: Envia pedido para a fila "delivered"
 *     tags:
 *       - Filas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderPayload'
 *     responses:
 *       200:
 *         description: Pedido enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QueueResponse'
 *       400:
 *         description: Erro ao enviar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/track/queue/finished', authenticateToken ,sendOrderToFinishidQueue)

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
export default router;
