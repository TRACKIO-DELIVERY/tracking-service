import { inRouteOrders } from "../channels/inRouteOrder.ts";

export async function inRouteOrdersender(data: any){
    
    await inRouteOrders.sendToQueue('order.in_route.queue', 
        Buffer.from(JSON.stringify(data)))

}