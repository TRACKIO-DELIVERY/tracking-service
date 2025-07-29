import { broker } from "../../config/rabbitmq.ts";

export const inRouteOrders = await broker.createChannel()

await inRouteOrders.assertQueue('order.in_route.queue')