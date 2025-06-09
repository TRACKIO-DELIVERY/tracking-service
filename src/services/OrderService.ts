import { db } from '../config/database.ts';
//import { Order } from '../interfaces/order.ts';
import { getIO } from '../sockets/trackingSockets.ts';

//refatorar essa, coordenadas ja devem vir no pedido
// export async function createTrackingTable(data: Order) {
//   const query = `INSERT INTO ordertracking
//     (
//         order,
//         start_latitude,
//         start_longitude,
//         end_latitude,
//         end_longitude,
//         event_status
//     ) VALUES ($1, $2, $3, $4, $5, $6) `;

//   //arrumar isso
//   const values = [
//     data.id,
//     data.origin.latitude,
//     data.origin.longitude,
//     data.destination.latitude,
//     data.destination.longitude,
//     'En Route',
//   ];

//   db.query(query, values);
// }

//essa função é chamda no controller
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

  //atualizar o pedido no django tambem quando tiver a rota
  db.query(query, values);
}

export function processAcceptedOrder(data: any) {
  console.log(data);

  //TODO:
  //- Criar tabela de rastreio pedido (FEITO)?

  //createTrackingTable(data);

  //aqui emitir talvez? quando a rota estiver pronta
  const io = getIO();
  //io.emit('route_ready').{data.id}
}
