import path from 'path';
import express from 'express';
import { getIO } from '../sockets/trackingSockets.ts';
import { orderInMemo } from '../data/order.ts';
import { acceptedOrderSender } from '../broker/sender/acceptedOrderSender.ts';
import { inRouteOrdersender } from '../broker/sender/inRouteOrderSender.ts';
import { deliveredOrderSender } from '../broker/sender/deliveredOrderSender.ts';
import { lastPositionOrderSender } from '../broker/sender/lastPositionOrderSender.ts';
import { selectTrackingCoordsByOrderId } from '../db/getTrackingCoords.ts';

type Response = express.Response;
type Request = express.Request;

export function getHealth(req: Request, res: Response) {
  res.status(200).json({ message: 'OK' });
}

// map
export function renderDeliveryMap(req: Request, res: Response) {
  res.sendFile(path.resolve('public', 'map.html'));
}

export async function getTrackingCoords(req: Request, res: Response) {
  const {orderId} = req.body

  const data = await selectTrackingCoordsByOrderId(orderId)
  return res.status(200).json({
    coords: data
  })
}

// tracking
export async function acceptedOrder(req:Request, res:Response){
  const {orderId} = req.body

  const io = getIO()
  io.emit('route_ready', orderId)

  orderInMemo[orderId] = {
    orderId
  }
  console.log('order aceita', orderId)
  res.status(200).json({message: "Order accepted"})
}

export async function startRoute(req: Request, res: Response){
  const {orderId} = req.body

  const existingOrder = orderInMemo[orderId]
  if(!existingOrder) {
    return res.status(404).json({
      error: "Order not found", 
    })
  }

  res.status(200).json({
    message: "Route is starting",
    orderId,
    canStartSendingLocation: true
  })

}

export async function sendOrderToAccptedQueue(req: Request, res: Response){
  const data = req.body

  try {
      await acceptedOrderSender(data)

     res.status(200).json({
      message: "Order sended to accepted queue",
    })
  } catch (error) {
    console.error("Error when sending order:", error);
    res.status(400).json({
     error: "Order could not be send", 
    })
  }
}

export async function sendOrderToInRouteQueue(req: Request, res: Response){
  const data = req.body

  try {
      await inRouteOrdersender(data)

     res.status(200).json({
      message: "Order sended to in route queue",
    })
  } catch (error) {
    console.error("Error when sending order:", error);
    res.status(400).json({
     error: "Order could not be send", 
    })
  }
}

export async function sendOrderToFinishidQueue(req: Request, res: Response){
  const data = req.body

  try {
      await deliveredOrderSender(data)

     res.status(200).json({
      message: "Order sended to delivered queue",
    })
  } catch (error) {
    console.error("Error when sending order:", error);
    res.status(400).json({
     error: "Order could not be send", 
    })
  }
}

export async function sendCoordsToLastPositionQueue(req: Request, res: Response){
  const data = req.body

  try {
      await lastPositionOrderSender(data)

     res.status(200).json({
      message: "Order sended to last-position queue",
    })
  } catch (error) {
    console.error("Error when sending order:", error);
    res.status(400).json({
     error: "Order could not be send", 
    })
  }
}