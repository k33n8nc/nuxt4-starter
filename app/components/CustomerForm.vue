<script setup lang="ts">
import { useCustomerStore } from '~/stores/customerStore';
// constants
const customerStore = useCustomerStore();
const state = reactive({
    email: '',
});
const errorMessage = ref<string | null>(null);
const isSubmitting = ref(false);

// methods
async function handleSubmit() {
    isSubmitting.value = true;
    errorMessage.value = null;
    try {
        await customerStore.addCustomer(state.email);
        state.email = '';
    } catch (error: any) {
        errorMessage.value = error.data?.statusMessage || 'An unexpected error occurred.';
        console.error('Failed to add customer:', error);
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div class="space-y-2">
      <label for="email" class="text-sm font-medium">Email</label>
      <input
        id="email"
        v-model="state.email"
        name="email"
        type="email"
        class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-white"
        placeholder="Enter customer email"
        required
      >
    </div>

    <Button
      type="submit"
      :disabled="isSubmitting"
    >
      {{ isSubmitting ? 'Adding...' : 'Add Customer' }}
      <Icon name="fa-solid:plus-circle" class="ml-2 mt-[1px]" />
    </Button>

    <div v-if="errorMessage" class="p-3 mt-4 text-red-700 bg-red-100 border border-red-400 rounded-md">
      <p>{{ errorMessage }}</p>
    </div>
  </form>
</template>
