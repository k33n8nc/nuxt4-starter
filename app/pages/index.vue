<template>
  <div class="container max-w-2xl p-4 mx-auto">
    <h1 class="text-2xl font-bold">
      Customer Management
    </h1>

    <div class="mt-6">
      <CustomerForm />
    </div>

    <CustomerList :customers="customers" />
  </div>
</template>

<script setup lang="ts">
import { useCustomerStore } from '~/stores/customerStore';
import { storeToRefs } from 'pinia';

const customerStore = useCustomerStore();
const { customers, error } = storeToRefs(customerStore);

// Fetch customers when the component is mounted
await customerStore.fetchCustomers();
</script>