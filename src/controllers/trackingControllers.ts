import { Request, Response } from 'express';
import path from 'path';

export function renderDeliveryMap(req: Request, res: Response) {
  res.sendFile(path.resolve('public', 'map.html'));
}
