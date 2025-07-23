import { db } from '../../utils/db';
import { customers } from '../../db/schema';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.email) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Email is required.',
            });
        }

        const newCustomer = db()
            .insert(customers)
            .values(body)
            .returning()
            .get();

        setResponseStatus(event, 201);
        return newCustomer;

    } catch (e: any) {
        // Log the original error for debugging.
        console.error('Error creating customer:', e);

        // Handle unique constraint errors from the database.
        if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            throw createError({
                statusCode: 409, // Conflict
                statusMessage: 'An account with this email already exists.',
            });
        }

        // For other errors, return a generic server error.
        throw createError({
            statusCode: 500,
            statusMessage: 'An internal server error occurred.',
        });
    }
});