<script setup lang="ts">
import { provide } from 'vue'

const modelValue = defineModel<string>()

provide('tabs', {
  value: modelValue
})
</script>

<template>
  <div class="w-full">
    <slot />
  </div>
</template> 