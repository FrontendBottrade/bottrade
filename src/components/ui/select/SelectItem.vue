<template>
  <div
    class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    :class="{ 'bg-accent text-accent-foreground': isSelected }"
    @click="handleSelect"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check v-if="isSelected" class="h-4 w-4" />
    </span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import { Check } from 'lucide-vue-next'

const props = defineProps<{
  value: string
}>()

const select = inject('select')

const isSelected = computed(() => select?.value === props.value)

const handleSelect = () => {
  select?.select(props.value)
}
</script> 