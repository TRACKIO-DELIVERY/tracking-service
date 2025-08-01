import { broker } from "../../config/rabbitmq.ts";

export const lastPositionOrder = await broker.createChannel()

await lastPositionOrder.assertQueue('order.last-position.queue')