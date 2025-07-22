<template>
  <div class="">
    <p>index page</p>

    <Button>Hello world</Button>
    <br />
    <Button>
      <Icon name="uil:github" class="mr-2 text-xl" />
      Login with GitHub
    </Button>

    <!-- Features List -->
    <div class="mt-10">
      <h2 class="text-2xl font-bold mb-4">Features from API</h2>

      <div v-if="pending"><p>Loading features...</p></div>
      <div v-else-if="error"><p>Could not load features: {{ error.message }}</p></div>
      <div v-else-if="features && features.length" class="grid md:grid-cols-2 gap-4">
        <div
            v-for="feature in features"
            :key="feature.id"
            class="p-4 border rounded-lg bg-white shadow-sm"
        >
          <h3 class="text-lg font-semibold flex items-center text-gray-800">
            <Icon :name="feature.icon" class="mr-3 text-2xl text-emerald-500" />
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 mt-2 pl-9">
            {{ feature.description }}
          </p>
        </div>
      </div>
      <div v-else>
        <p>No features found. Add some to the database!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This part doesn't change at all!
const {
  data: features,
  pending,
  error,
} = await useFetch('/api/features');
</script>