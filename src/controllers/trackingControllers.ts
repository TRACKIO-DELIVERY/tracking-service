import { Request, Response } from 'express';
import path from 'path';
import { updateOrderTable } from '../services/OrderService';

export function renderDeliveryMap(req: Request, res: Response) {
  res.sendFile(path.resolve('public', 'map.html'));
}

export async function setDeliverPerson(req: Request, res: Response) {
  const { orderId, deliverPersonId } = req.body;

  if (!orderId || !deliverPersonId) {
    res.status(400).json({
      error: 'OrderId e DeliverPersonId são obrigatório',
    });
  }

  try {
    await updateOrderTable(orderId, deliverPersonId, 'En Route');
    res.status(200).json({
      message: 'Entregador associado com sucesso',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'OrderId e DeliverPersonId são obrigatório',
    });
  }
}
