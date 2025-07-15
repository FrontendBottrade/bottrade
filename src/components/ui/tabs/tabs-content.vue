<script setup lang="ts">
import { inject, computed } from 'vue'

const props = defineProps<{
  value: string
}>()

const tabs = inject('tabs')
const isSelected = computed(() => tabs?.value === props.value)
</script>

<template>
  <div v-if="isSelected" class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
    <slot />
  </div>
</template> 