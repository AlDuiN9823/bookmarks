import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./server/db/schema/*.schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    user: "postgres",
    password: process.env.DATABASE_PASSWORD as string,
    host: process.env.DATABASE_HOST as string,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_DB as string,
  }
});