import { integer, pgTable, serial, text, uuid, varchar } from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length:50 })
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 20 }).notNull(),
  password: text('password').notNull(),
  email: text('email').unique(),
  roleId: integer('role_id').references(() => roles.id).default(2)
});