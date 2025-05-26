import { db } from '../config/database';
import { Order } from '../interfaces/order';

export function createTrackingTable(data: Order) {
  const query = `INSERT INTO ordertracking 
    (
        order, 
        start_latitude, 
        start_longitude, 
        end_latitude, 
        end_longitude,
        event_status
    ) VALUES ($1, $2, $3, $4, $5, $6) `;

  const values = [
    data.id,
    data.origin.latitude,
    data.origin.longitude,
    data.destination.latitude,
    data.destination.longitude,
    'En Route',
  ];

  db.query(query, values);
}

export function updateOrderTable(
  orderId: string,
  deliverPerson: string,
  orderStatus: string,
) {
  const query = `
    UPDATE order 
    set deliver_person = $1,status = $2 
    WHERE order_id = $3`;

  const values = [deliverPerson, orderStatus, orderId];

  db.query(query, values);
}
export async function processAcceptedOrder(data: Order, res: Response) {
  console.log(data);

  //TODO:
  //- Criar tabela de rastreio pedido (FEITO)
  //- Converter o endereço para coordenadas, e usar ele no mapa.html (como fazer isso?)

  createTrackingTable(data);
}
