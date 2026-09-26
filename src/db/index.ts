import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || '';

// For Supabase connection pooler (Transaction mode, port 6543),
// 'prepare: false' is required as transaction poolers do not support prepared statements.
const client = postgres(connectionString, {
  prepare: false,
  max: 10,
});

export const db = drizzle(client, { schema });
export * from './schema';
