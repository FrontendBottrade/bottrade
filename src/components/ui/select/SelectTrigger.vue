<template>
  <button
    type="button"
    ref="buttonRef"
    @click="handleClick"
    class="select-trigger flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
  >
    <slot></slot>
    <ChevronDown class="h-4 w-4 opacity-50" :class="{ 'rotate-180': select?.open }" />
  </button>
</template>

<script setup lang="ts">
import { inject, ref, onMounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const select = inject('select')
const buttonRef = ref<HTMLElement | null>(null)

const handleClick = () => {
  select?.toggle()
}

onMounted(() => {
  if (select && buttonRef.value) {
    select.triggerRef = buttonRef.value
  }
})
</script> 