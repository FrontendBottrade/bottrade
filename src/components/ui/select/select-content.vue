<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue'

const select = inject('select')

const handleClickOutside = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).closest('.select-content')) {
    select?.close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div v-if="select?.open" class="select-content absolute top-full left-0 z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
    <div class="p-1">
      <slot />
    </div>
  </div>
</template> 