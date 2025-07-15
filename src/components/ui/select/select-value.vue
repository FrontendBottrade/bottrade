<script setup lang="ts">
import { inject } from 'vue'

defineProps<{
  placeholder?: string
}>()

const select = inject('select')
</script>

<template>
  <span class="block truncate">
    <slot v-if="select?.value">{{ select.value }}</slot>
    <span v-else class="text-muted-foreground">{{ placeholder }}</span>
  </span>
</template> 