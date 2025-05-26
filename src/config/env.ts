import 'dotenv/config';

export const env = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL!,
  RABBITMQ_URL: process.env.RABBITMQ_ULR!,
  GEOCODING_API_KEY: process.env.GEOCODING_API_KEY!,
  GOOGLE_GEOCODING_KEY: process.env.GOOGLE_GEOCODING_KEY!,
};
