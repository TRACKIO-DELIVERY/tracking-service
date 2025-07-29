import { broker } from "../../config/rabbitmq.ts";

export const deliveredOrders =  await broker.createChannel()

await deliveredOrders.assertQueue('order.delivered.queue')