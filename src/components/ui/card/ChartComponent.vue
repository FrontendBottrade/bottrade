<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { AgCharts } from 'ag-charts-vue3'
import type { AgChartOptions } from 'ag-charts-types'

const props = defineProps<{
  title?: string
  data: any[]
  series: AgChartOptions['series']
}>()

const options = ref<AgChartOptions>({
  title: {
    text: props.title ?? 'Default Chart Title',
  },
  data: props.data,
  series: props.series,
})

watchEffect(() => {
  options.value = {
    title: {
      text: props.title ?? 'Default Chart Title',
    },
    data: props.data,
    series: props.series,
  }
})
</script>

<template>
  <ag-charts :options="options" />
</template>