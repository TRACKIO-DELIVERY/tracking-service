import { lastPositionOrder } from "../channels/lastPositionOrder.ts";

export async function lastPositionOrderSender(data:any){
    await lastPositionOrder.sendToQueue('order.last-position.queue', 
        Buffer.from(JSON.stringify(data))
    )
}