// Use relative paths for imports within the /server directory
import { db } from '../utils/db';
import { features } from '../db/schema';

// This endpoint now reads from the SQLite database.
export default defineEventHandler(async () => {
    try {
        // This logic remains the same
        const allFeatures = await db().select().from(features).all();
        return allFeatures;
    } catch (e: any) {
        // Error handling
        throw createError({
            statusCode: 500,
            statusMessage: e.message,
        });
    }
});