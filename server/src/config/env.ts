import 'dotenv/config';

export const env = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL!,
  RABBITMQ_URL: process.env.RABBITMQ_ULR!,
};
