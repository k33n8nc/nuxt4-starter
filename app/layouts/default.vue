<template>
  <div>
    <!-- header part-->
    <header class="bg-gray-200 h-[50px] w-full flex px-4">
      <div class="container mx-auto">
        <h1>MTP Testdata Generator</h1>
      </div>
    </header>
    <!-- main part-->
    <main class=" h-[calc(100vh-85px)] px-4">
      <div class="container mx-auto">
        <slot />
      </div>
    </main>
    <!-- footer part-->
    <footer class="h-[35px] bg-gray-200 px-4">
      <div class="container mx-auto">
        footer
      </div>
    </footer>
  </div>
</template>
<script setup lang="ts">
</script>