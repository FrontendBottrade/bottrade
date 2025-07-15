<script setup lang="ts">
import { inject, computed } from 'vue'

const props = defineProps<{
  value: string
}>()

const tabs = inject('tabs')
const isSelected = computed(() => tabs?.value === props.value)

const handleSelect = () => {
  if (tabs?.value) {
    tabs.value = props.value
  }
}
</script>

<template>
  <button
    type="button"
    :class="[
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      isSelected ? 'bg-background text-foreground shadow-sm' : 'hover:bg-background/50'
    ]"
    @click="handleSelect"
  >
    <slot />
  </button>
</template> 