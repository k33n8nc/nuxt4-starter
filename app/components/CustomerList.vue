<script setup lang="ts">
import type { Customer } from '~/../server/db/schema';

defineProps<{
    customers: Customer[] | undefined
}>();

const emit = defineEmits(['customer-deleted']);

async function handleDelete(customerId: number) {
    try {
        await $fetch(`/api/customers/${customerId}`, {
            method: 'DELETE',
        });
        emit('customer-deleted');
    } catch (error) {
        console.error('Failed to delete customer:', error);
        // You could add user-facing error handling here
    }
}
</script>

<template>
  <div class="mt-8">
    <h2 class="text-xl font-semibold">
      Customer List
    </h2>
    <div v-if="!customers || customers.length === 0" class="p-4 mt-4 text-gray-500 bg-gray-100 rounded-md">
      <p>No customers found. Add one using the form above.</p>
    </div>
    <ul v-else class="mt-4 space-y-2">
      <li v-for="customer in customers" :key="customer.id" class="flex items-center justify-between p-4 bg-white border rounded-md shadow-sm">
        <p class="text-sm text-gray-600">
          {{ customer.email }}
        </p>
        <button class="text-red-500 hover:text-red-700" @click="handleDelete(customer.id)">
          <Icon name="fa-solid:trash" />
        </button>
      </li>
    </ul>
  </div>
</template>
