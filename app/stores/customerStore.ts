import {defineStore} from 'pinia';
import type {Customer} from '~/../server/db/schema';

export const useCustomerStore = defineStore('customer', () => {
    // State
    const customers = ref<Customer[]>([]);
    const pending = ref(false);
    const error = ref<Error | null>(null);

    // Actions
    async function fetchCustomers() {
        pending.value = true;
        error.value = null;
        try {
            customers.value = await $fetch<Customer[]>('/api/customers');
        } catch (e: any) {
            error.value = e;
            console.error('Failed to fetch customers:', e);
        } finally {
            pending.value = false;
        }
    }

    async function addCustomer(email: string) {
        const newCustomer = await $fetch<Customer>('/api/customers', {
            method: 'POST',
            body: { email },
        });
        if (newCustomer) {
            customers.value.push(newCustomer);
        }
    }

    async function deleteCustomer(customerId: number) {
        try {
            // Wait for the API call to complete successfully.
            await $fetch(`/api/customers/${customerId}`, {
                method: 'DELETE',
            });

            // On success, remove the customer from the local state using filter.
            customers.value = customers.value.filter(c => c.id !== customerId);
        } catch (e: any) {
            console.error('Failed to delete customer:', e);
            // Re-throw the error to be handled by the component if needed.
            throw e;
        }
    }

    return {
        customers,
        pending,
        error,
        fetchCustomers,
        addCustomer,
        deleteCustomer,
    };
});
