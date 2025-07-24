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

        const body = await readBody(event);
        if (!body || Object.keys(body).length === 0) {
            throw createError({
                statusCode: 400,
                statusMessage: 'No update data provided.',
            });
        }

        const updatedCustomer = db()
            .update(customers)
            .set(body)
            .where(eq(customers.id, Number(customerId)))
            .returning()
            .get();

        if (!updatedCustomer) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Customer not found',
            });
        }

        return updatedCustomer;
    } catch (e: any) {
        if (e.statusCode) throw e;
        console.error('Error updating customer:', e);
        throw createError({
            statusCode: 500,
            statusMessage: 'An internal server error occurred.',
        });
    }
});

