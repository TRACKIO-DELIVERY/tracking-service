import { acceptedOrders } from "../channels/acceptedOrders.ts";

export async function acceptedOrderSender(data: any){
    
    await acceptedOrders.sendToQueue('order.accepted.queue', 
        Buffer.from(JSON.stringify(data)))

}