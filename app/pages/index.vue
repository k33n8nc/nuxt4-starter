<template>
  <div class="">
    <p>index page</p>

    <Button>Hello world</Button>
    <br />
    <Button>
      <Icon name="uil:github" class="mr-2 text-xl" />
      Login with GitHub
    </Button>

    <!-- Create Customer Form -->
    <div class="my-10 p-4 border rounded-lg bg-gray-50/50 dark:bg-gray-800/50 dark:border-gray-700">
      <h3 class="text-xl font-bold mb-4">Add a New Customer</h3>
      <form @submit.prevent="handleCreateCustomer" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
          <input v-model="newCustomer.email" type="email" id="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        </div>
        <Button type="submit">
          <Icon name="uil:user-plus" class="mr-2" />
          Add Customer
        </Button>
      </form>
    </div>

    <!-- Customers List -->
    <div class="mt-10">
      <h2 class="text-2xl font-bold mb-4">Customers from API</h2>

      <div v-if="pending"><p>Loading customers...</p></div>
      <div v-else-if="error"><p>Could not load customers: {{ error.message }}</p></div>
      <div v-else-if="customers && customers.length" class="space-y-2">
        <div
            v-for="customer in customers"
            :key="customer.id"
            class="p-3 border rounded-lg bg-white shadow-sm flex items-center"
        >
          <Icon name="uil:user-circle" class="mr-3 text-2xl text-emerald-500" />
          <span class="text-gray-800">{{ customer.email }}</span>
          <span class="ml-auto text-xs text-gray-400">ID: {{ customer.id }}</span>
        </div>
      </div>
      <div v-else>
        <p>No customers found. Add one using the form above!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Fetch customers instead of features
const {
  data: customers,
  pending,
  error,
  refresh,
} = await useFetch('/api/customers');

// State for our new customer form
const newCustomer = ref({
  email: '',
});

// ... inside <script setup lang="ts">

// /app/pages/index.vue -> inside <script setup>

async function handleCreateCustomer() {
  if (!newCustomer.value.email) {
    alert('Please enter an email address.');
    return;
  }

  try {
    await $fetch('/api/customers', {
      method: 'POST',
      body: newCustomer.value,
    });

    // Reset the form and refresh the list
    newCustomer.value.email = '';
    await refresh();
  } catch (err: any) {
    // This logic correctly handles both structured validation errors
    // and plain status message errors from the API.
    const validationErrors = err.data?.data;
    if (validationErrors?.email) {
      // Use the specific message for the 'email' field if it exists.
      alert(`Error: ${validationErrors.email[0]}`);
    } else {
      // Otherwise, use the general error message from the API response.
      const errorMessage = err.data?.statusMessage || 'An unexpected error occurred.';
      alert(`Error: ${errorMessage}`);
    }
  }
}
</script>