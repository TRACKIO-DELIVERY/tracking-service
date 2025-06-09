import { Request, Response } from 'express';
import path from 'path';
import { updateOrderTable } from '../services/OrderService.js';
import { db } from '../config/database.js';

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

export async function getTrackingCoords(req: Request, res: Response) {
  const { orderId } = req.params;

  const query = `
    SELECT 
      start_latitude,
      start_longitude,
      end_latitude,
      end_longitude
    FROM ordertracking
    WHERE id = $1
    `;

  const result = await db.query(query, [orderId]);

  if (result.rows.length === 0) {
    res.status(400).json({ error: 'Rastreamento não encontrado ' });
  }

  const row = result.rows[0];

  res.json({
    origin: {
      lat: row.start_latitude,
      lng: row.start_longitude,
    },
    destination: {
      lat: row.end_latitude,
      lng: row.end_longitude,
    },
  });
}
