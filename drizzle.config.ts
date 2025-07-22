import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'sqlite', // 'postgresql' | 'mysql' | 'sqlite'
    schema: './server/db/schema.ts',
    out: './server/db/migrations',
    dbCredentials: {
        url: './server/db/db.sqlite', // The path to your database file
    },
    verbose: true,
    strict: true,
});