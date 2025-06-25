import path from 'path';
import express from 'express';

type Response = express.Response;
type Request = express.Request;

export function getHealth(req: Request, res: Response) {
  res.status(200).json({ message: 'OK' });
}
export function renderDeliveryMap(req: Request, res: Response) {
  res.sendFile(path.resolve('public', 'map.html'));
}

export async function getTrackingCoords(req: Request, res: Response) {
  //aqui vai ser pela fila, pegando o id vindo do app
}
