import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// This defines the 'features' table for our SQLite database.
// The structure mirrors the interface we had before.
export const features = sqliteTable('features', {
    id: integer('id').primaryKey({ autoIncrement: true }), // Use an auto-incrementing integer for the ID
    title: text('title').notNull(),
    description: text('description').notNull(),
    icon: text('icon').notNull(),
});