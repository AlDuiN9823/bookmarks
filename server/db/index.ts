import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const { Pool } = pg

const pool = new Pool({
    user: "postgres",
    password: process.env.DATABASE_PASSWORD as string,
    host: process.env.DATABASE_HOST as string,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_DB as string
});

export const db = drizzle(pool);