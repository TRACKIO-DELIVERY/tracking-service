import { acceptedOrders } from '../channels/acceptedOrders.ts';

export async function acceptedOrdersConsumer(){
  
  return acceptedOrders.consume('order.accepted.queue', async (msg) => {
  
    if (!msg){
      return null
    }
      
    const data = await msg.content.toString();
    acceptedOrders.ack(msg)
    return data
  }, {
    noAck: false,
  });

}


