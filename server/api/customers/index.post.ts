// /server/api/customers/index.post.ts

import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { db } from '../../utils/db';
import { customers } from '../../db/schema';

// 1. Generate the base schema that matches the database table.
const baseInsertSchema = createInsertSchema(customers);

// 2. Refine the schema with specific frontend validation rules.
// This two-step approach is more robust and readable.
const insertCustomerSchema = baseInsertSchema.extend({
    // Add the .email() validation to the existing string schema.
    email: baseInsertSchema.shape.email.email({ message: 'Please enter a valid email address.' })
}).omit({ id: true }); // We don't need the ID for insertion.

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const parsedBody = insertCustomerSchema.parse(body);

        const newCustomer = db()
            .insert(customers)
            .values(parsedBody)
            .returning()
            .get();

        setResponseStatus(event, 201);
        return newCustomer;

    } catch (e: any) {
        // Always log the original error to the server console for debugging.
        console.error('Error creating customer:', e);

        if (e instanceof z.ZodError) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Validation Error',
                data: e.flatten().fieldErrors,
            });
        }

        if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            throw createError({
                statusCode: 409, // Conflict
                statusMessage: 'An account with this email already exists.',
            });
        }

        // For all other errors, send the actual error message back.
        throw createError({
            statusCode: 500,
            statusMessage: e.message || 'An internal server error occurred.',
        });
    }
});