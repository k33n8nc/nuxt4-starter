<script setup lang="ts">
import type { Customer } from '~/../server/db/schema';

defineProps<{
    customers: Customer[] | undefined
}>();
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
      <li v-for="customer in customers" :key="customer.id" class="p-4 bg-white border rounded-md shadow-sm">
        <p class="text-sm text-gray-600">
          {{ customer.email }}
        </p>
      </li>
    </ul>
  </div>
</template>
