<template>
  <span class="block truncate">
    <slot>{{ select?.value || placeholder }}</slot>
  </span>
</template>

<script setup lang="ts">
import { inject } from 'vue'

defineProps<{
  placeholder?: string
}>()

const select = inject('select')
</script> 