<script setup lang="ts">
import { computed, inject } from 'vue'
import { Check } from 'lucide-vue-next'

const props = defineProps<{
  value: string
}>()

const select = inject('select')

const isSelected = computed(() => select?.value === props.value)

const handleSelect = () => {
  if (select?.value) {
    select.value = props.value
  }
  select?.close()
}
</script>

<template>
  <button
    type="button"
    class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
    @click="handleSelect"
  >
    <Check v-if="isSelected" class="mr-2 h-4 w-4" />
    <span :class="{ 'ml-6': !isSelected }">
      <slot />
    </span>
  </button>
</template> 