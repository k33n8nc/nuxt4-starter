<template>
  <div class="container max-w-2xl p-4 mx-auto">
    <h1 class="text-2xl font-bold">
      Customer Management
    </h1>

    <div class="mt-6">
      <CustomerForm @customer-added="handleCustomerAdded" />
    </div>

    <div v-if="pending">
      Loading customers...
    </div>
    <div v-else-if="error">
      Error loading customers: {{ error.message }}
    </div>
    <CustomerList v-else :customers="customers" />
  </div>
</template>

<script setup lang="ts">
import type { Customer } from '~/../server/db/schema';

const { data: customers, pending, error, refresh } = await useFetch<Customer[]>('/api/customers');

function handleCustomerAdded() {
    // Refresh the list of customers when a new one is added.
    refresh();
}
</script>