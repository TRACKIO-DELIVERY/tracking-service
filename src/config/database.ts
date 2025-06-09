import { Pool } from 'pg';
import { env } from './env.ts';

export const db = new Pool({ connectionString: env.DATABASE_URL });
