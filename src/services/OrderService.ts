import { db } from '../config/database.js';
import { Order } from '../interfaces/order';
import { GeocodeService } from './GeocodeService.js';

//refatorar essa, ter q fazer chamda api django pra acessar o endereço
//converter pra coords e depois mandar a tabela
export function createTrackingTable(orderId: string) {
  const { originCoords, destinationCoords } = convertAdressToCoords();

  const query = `INSERT INTO ordertracking 
    (
        order, 
        start_latitude, 
        start_longitude, 
        end_latitude, 
        end_longitude,
        event_status
    ) VALUES ($1, $2, $3, $4, $5, $6) `;

  //arrumar isso
  const values = [orderId, originCoords, destinationCoords, 'En Route'];

  db.query(query, values);
}

export function convertAdressToCoords() {
  //fazer chamada django agui
  const originAddress = '';
  const destinationAddress = '';

  const originCoords = GeocodeService.addressToCoords(originAddress);
  const destinationCoords = GeocodeService.addressToCoords(destinationAddress);

  return { originCoords, destinationCoords };
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

  //atualizar o pedido no django tambem quando tiver a rota
  db.query(query, values);
}

export function processAcceptedOrder(data: Order) {
  console.log(data);

  //TODO:
  //- Criar tabela de rastreio pedido (FEITO)
  //- Converter o endereço para coordenadas, e usar ele no mapa.html (como fazer isso?)

  createTrackingTable(data.id);
}
