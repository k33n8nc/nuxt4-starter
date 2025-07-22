import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// This defines the 'customers' table for our SQLite database.
// The 'unique' constraint on email is a best practice to prevent duplicates.
export const customers = sqliteTable('customers', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    email: text('email').notNull().unique(),
});