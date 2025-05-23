import { Order } from '../interfaces/order';

export async function processAcceptedOrder(data: Order) {
  console.log(data);

  //TODO:
  //- Criar tabela de rastreio pedido
  //- Update na tabela order para associar o entregador
  //- Converter o endereço para coordenadas, e usar ele no mapa.html (como fazer isso?)
}
