import { defineStore } from 'pinia';
import type { Customer } from '~/../server/db/schema';

export const useCustomerStore = defineStore('customer', () => {
    // State
    const customers = ref<Customer[]>([]);
    const error = ref<Error | null>(null);

    // GET Customers
    async function fetchCustomers() {
        error.value = null;
        try {
            customers.value = await $fetch<Customer[]>('/api/customers');
        } catch (e: any) {
            error.value = e;
            console.error('Failed to fetch customers:', e);
        }
    }

    // POST Customer
    async function addCustomer(email: string) {
        error.value = null;
        try {
            const newCustomer = await $fetch<Customer>('/api/customers', {
                method: 'POST',
                body: { email },
            });
            if (newCustomer) {
                customers.value.push(newCustomer);
            }
        } catch (e: any) {
            error.value = e;
            console.error('Failed to add customer:', e);
            throw e;
        }
    }

    // PUT Customer
    async function updateCustomer(customerId: number, updatedFields: Partial<Customer>) {
        error.value = null;
        try {
            const updatedCustomer = await $fetch<Customer>(`/api/customers/${customerId}`, {
                method: 'PUT',
                body: updatedFields,
            });
            customers.value = customers.value.map(c =>
                c.id === customerId ? { ...c, ...updatedCustomer } : c
            );
        } catch (e: any) {
            error.value = e;
            console.error('Failed to update customer:', e);
            throw e;
        }
    }

    // DELETE Customer
    async function deleteCustomer(customerId: number) {
        error.value = null;
        try {
            await $fetch(`/api/customers/${customerId}`, {
                method: 'DELETE',
            });
            customers.value = customers.value.filter(c => c.id !== customerId);
        } catch (e: any) {
            error.value = e;
            console.error('Failed to delete customer:', e);
            throw e;
        }
    }

    return {
        customers,
        error,
        fetchCustomers,
        addCustomer,
        deleteCustomer,
        updateCustomer,
    };
});
