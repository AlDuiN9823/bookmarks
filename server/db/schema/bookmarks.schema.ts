import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const bookmarks = pgTable('bookmarks', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    url: text('title').notNull(),
    description: text('title'),
    createdAt: timestamp('created_at').defaultNow(),
    userId: uuid('user_id').references(() => users.id)
});