import { acceptedOrders } from '../channels/acceptedOrders.ts';

acceptedOrders.consume('order.accepted.queue', async (msg) => {

  if (!msg){
    return null
  }
    
  const data = msg.content.toString();
  console.log('FILA:', data)

  acceptedOrders.ack(msg);   
}, {
  noAck: false,
});


  console.log('🟢 Consumidor orders.accepted.queue ativo');
