<script setup lang="ts">
import type { Customer } from '~/../server/db/schema';
import { useCustomerStore } from '~/stores/customerStore';

// set properties for this component
defineProps({
  customers: {
    type: Array as PropType<Customer[]>,
    required: false
  }
});

const customerStore = useCustomerStore();

async function handleDelete(customerId: number) {
    try {
        await customerStore.deleteCustomer(customerId);
    } catch (error) {
        console.error('Failed to delete customer:', error);
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
        <Button @click="handleDelete(customer.id)" class="bg-red-400">
          <Icon name="fa-solid:trash" />
        </Button>
      </li>
    </ul>
  </div>
</template>