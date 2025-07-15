<script setup lang="ts">
import { ref, provide, watch } from 'vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const open = ref(false)
const selectedValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  selectedValue.value = newValue
})

provide('select', {
  value: selectedValue,
  open,
  toggle: () => {
    open.value = !open.value
  },
  close: () => {
    open.value = false
  },
  select: (value: string) => {
    selectedValue.value = value
    emit('update:modelValue', value)
    open.value = false
  }
})
</script>

<template>
  <div class="relative">
    <slot></slot>
  </div>
</template> 