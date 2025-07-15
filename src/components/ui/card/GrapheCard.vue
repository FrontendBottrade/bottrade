<template>
    <div class="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Statistiques</h2>
        <div class="flex items-center gap-2">
          <select v-model="selectedPeriod" @change="updateRange" class="border rounded px-2 py-1">
            <option value="lastMonth">Dernier mois</option>
            <option value="lastWeek">Dernière semaine</option>
            <option value="today">Aujourd'hui</option>
            <option value="custom">Personnalisée</option>
          </select>
  
          <template v-if="selectedPeriod === 'custom'">
            <input type="date" v-model="customRange.from" class="border rounded px-2 py-1" />
            <span>→</span>
            <input type="date" v-model="customRange.to" class="border rounded px-2 py-1" />
          </template>
        </div>
      </div>
  
      <p class="text-sm text-gray-500 mb-4">Période : {{ formattedRange }}</p>
  
      <ChartComponent
        title="Activité"
        :data="chartData"
        :series="series"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { format, subDays, subMonths } from 'date-fns'
  import ChartComponent from './ChartComponent.vue' // Ton composant avec ag-charts
  
  const selectedPeriod = ref<'lastMonth' | 'lastWeek' | 'today' | 'custom'>('lastMonth')
  const customRange = ref({ from: '', to: '' })
  const range = ref<{ from: Date; to: Date }>({ from: new Date(), to: new Date() })
  const updateRange = () => {
    const now = new Date()
    switch (selectedPeriod.value) {
      case 'today':
        range.value = { from: now, to: now }
        break
      case 'lastWeek':
        range.value = { from: subDays(now, 7), to: now }
        break
      case 'lastMonth':
        range.value = { from: subMonths(now, 1), to: now }
        break
      case 'custom':
        if (customRange.value.from && customRange.value.to) {
          range.value = {
            from: new Date(customRange.value.from),
            to: new Date(customRange.value.to),
          }
        }
        break
    }
  }
  
  watch([selectedPeriod, customRange], updateRange, { deep: true })
  
  const formattedRange = computed(() => {
    if (!range.value.from || !range.value.to) return 'N/A'
    return `${format(range.value.from, 'dd/MM/yyyy')} → ${format(range.value.to, 'dd/MM/yyyy')}`
  })
  
  const chartData = ref<any[]>([])
  const series = ref([
    {
      type: 'line',
      xKey: 'date',
      yKey: 'value',
      yName: 'Valeur',
    },
  ])
  
  const generateData = () => {
    const from = range.value.from
    const to = range.value.to
    const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
    const data = []
  
    for (let i = 0; i <= days; i++) {
      const d = new Date(from)
      d.setDate(d.getDate() + i)
      data.push({
        date: format(d, 'yyyy-MM-dd'),
        value: Math.floor(Math.random() * 100),
      })
    }
  
    chartData.value = data
  }
  
  watch(range, generateData, { immediate: true })
  </script>
  