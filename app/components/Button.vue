<script setup lang="ts">
// No props are needed if you only use a slot for the content.
// You can add other props for variants, disabled state, etc.
</script>

<template>
  <button
      type="button"
      class="bg-emerald-500 rounded px-3 py-2 cursor-pointer text-white text-sm inline-flex items-center"
  >
    <slot />
  </button>
</template>