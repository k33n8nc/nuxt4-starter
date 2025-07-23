<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-200 h-14 fixed top-0 w-full z-10">
      <nav class="container mx-auto h-full flex flex-col justify-center px-4">
        <h1 class="font-bold">Nuxt 4 + Tawilwind 4 Starter</h1>
        <small>See readme and package.json for more info.</small>
      </nav>
    </header>

    <main class="flex-1 container mx-auto px-4 mt-14 mb-14 overflow-auto">
      <slot />
    </main>

    <footer class="bg-gray-200 h-14 fixed bottom-0 w-full">
      <div class="container mx-auto h-full flex items-center px-4">
        <p class="text-sm text-gray-500">
          free to copy © <a href="https://cybernetix.nl" target="_blank">cybernetix {{ new Date().getFullYear() }}</a>
        </p>
      </div>
    </footer>
  </div>
</template>