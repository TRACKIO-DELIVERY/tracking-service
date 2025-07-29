import { broker } from "../../config/rabbitmq.ts";

export const acceptedOrders = await broker.createChannel()

await acceptedOrders.assertQueue('order.accepted.queue')