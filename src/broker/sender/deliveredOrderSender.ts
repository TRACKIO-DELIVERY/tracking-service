import { deliveredOrders } from "../channels/deliveredOrder.ts";

export async function deliveredOrderSender(data: any){
    
    await deliveredOrders.sendToQueue('order.delivered.queue', 
        Buffer.from(JSON.stringify(data)))

}