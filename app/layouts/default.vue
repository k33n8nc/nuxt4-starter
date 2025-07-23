<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-200 h-14 fixed top-0 w-full z-10">
      <nav class="container mx-auto h-full flex items-center px-4">
        <h1 class="font-bold">Nuxt Starter</h1>
      </nav>
    </header>

    <main class="flex-1 container mx-auto px-4 mt-14 mb-14 overflow-auto">
      <slot />
    </main>

    <footer class="bg-gray-200 h-14 fixed bottom-0 w-full">
      <div class="container mx-auto h-full flex items-center px-4">
        <span>© {{ new Date().getFullYear() }}</span>
      </div>
    </footer>
  </div>
</template>
<script setup lang="ts">
</script>