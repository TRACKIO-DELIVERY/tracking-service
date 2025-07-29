import amqp from 'amqplib';
import { env } from '../config/env.ts';

if (!env.RABBITMQ_URL) {
  throw new Error('Rabbit URL must be configured');
}

export const broker = await amqp.connect(env.RABBITMQ_URL);
