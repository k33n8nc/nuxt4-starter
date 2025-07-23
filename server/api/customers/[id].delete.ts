import { eq } from 'drizzle-orm';
import { db } from '../../utils/db';
import { customers } from '../../db/schema';

export default defineEventHandler(async (event) => {
    try {
        const customerId = getRouterParam(event, 'id');

        if (!customerId) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Customer ID is required',
            });
        }

        const deletedCustomer = db()
            .delete(customers)
            .where(eq(customers.id, Number(customerId)))
            .returning()
            .get();

        if (!deletedCustomer) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Customer not found',
            });
        }

        setResponseStatus(event, 204);
        return;

    } catch (e: any) {
        // Re-throw known h3 errors.
        if (e.statusCode) {
            throw e;
        }

        console.error('Error deleting customer:', e);
        throw createError({
            statusCode: 500,
            statusMessage: 'An internal server error occurred.',
        });
    }
});
