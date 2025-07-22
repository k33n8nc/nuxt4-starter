import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

// Note: This is a server-only utility.

let _db: ReturnType<typeof drizzle> | null = null;

export const db = () => {
    if (_db) {
        return _db;
    }

    // Using `import.meta.dev` is the modern, standard way to check for development mode.
    const dbPath = import.meta.dev ? 'server/db/db.sqlite' : 'prod.sqlite';

    const sqlite = new Database(dbPath);

    _db = drizzle(sqlite);
    return _db;
};