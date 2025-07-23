<script setup lang="ts">
const emit = defineEmits(['customer-added']);

const state = reactive({
    email: '',
});
const errorMessage = ref<string | null>(null);
const isSubmitting = ref(false);

async function handleSubmit() {
    isSubmitting.value = true;
    errorMessage.value = null;
    try {
        await $fetch('/api/customers', {
            method: 'POST',
            body: {
                email: state.email,
            },
        });

        // Clear form and emit event
        state.email = '';
        emit('customer-added');

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
        class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter customer email"
        required
      >
    </div>

    <button
      type="submit"
      class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      :disabled="isSubmitting"
    >
      {{ isSubmitting ? 'Adding...' : 'Add Customer' }}
    </button>

    <div v-if="errorMessage" class="p-3 mt-4 text-red-700 bg-red-100 border border-red-400 rounded-md">
      <p>{{ errorMessage }}</p>
    </div>
  </form>
</template>
