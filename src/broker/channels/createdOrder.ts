import { broker } from '../../config/rabbitmq.ts'

export const createdOrders = await broker.createChannel()

await createdOrders.assertQueue('order.created.queue')