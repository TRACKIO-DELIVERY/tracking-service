//consumir fila do rabbit
//ao receber pedido, criar nova tabela no banco de rasterio_pedido
//atualizado a tabela pedido com o entregador associado

import amqp from 'amqplib';
import { env } from '../config/env';
import { json } from 'stream/consumers';

const RABBITMQ_URL = env.RABBITMQ_URL;
const QUEUE_NAME = 'accepted.order';

export async function startAcceptedOrderConsumer() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME, { durable: true });

  channel.consume(QUEUE_NAME, async (msg) => {
    if (msg) {
      try {
        const data = JSON.parse(msg.content.toString());

        //processar

        channel.ack(msg);
      } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        channel.nack(msg, false, false);
      }
    }
  });

  console.log(`Consumindo mensagens de ${QUEUE_NAME}`);
}
