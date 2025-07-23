<template>
  <div class="container max-w-2xl p-4 mx-auto">
    <h1 class="text-2xl font-bold">
      Customer Management
    </h1>

    <div class="mt-6">
      <CustomerForm />
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
import { useCustomerStore } from '~/stores/customerStore';
import { storeToRefs } from 'pinia';

const customerStore = useCustomerStore();
const { customers, pending, error } = storeToRefs(customerStore);

// Fetch customers when the component is mounted
await customerStore.fetchCustomers();
</script>