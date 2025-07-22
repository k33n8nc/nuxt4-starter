import {db} from '../../utils/db';
import {customers} from '../../db/schema';

export default defineEventHandler(() => {
    try {
        return db().select().from(customers).all();
    } catch (e: any) {
        throw createError({
            statusCode: 500,
            statusMessage: e.message,
        });
    }
});