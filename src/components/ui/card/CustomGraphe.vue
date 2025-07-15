<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { format, subDays, subMonths } from 'date-fns'
import {ChartBarIcon,ChartLineIcon,ChartPieIcon} from 'lucide-vue-next';
import { AgCharts } from 'ag-charts-vue3'
import type { AgChartOptions } from 'ag-charts-community'
import { useAppearance, getEffectiveTheme } from '@/composables/useAppearance';

const { appearance, updateAppearance } = useAppearance();

const currentTheme = computed(() => getEffectiveTheme(appearance.value));
interface ChartOption {
  value: 'line' | 'pie' | 'bar';
  label: string;
  icon: any;
}

interface ChartData {
  date: string;
  value: number;
}

const props = defineProps<{
  title?: string
}>()

const availableChartTypes: ChartOption[] = [
  { value: 'line', label: 'Line Chart', icon: ChartLineIcon },
  { value: 'pie', label: 'Pie Chart', icon: ChartPieIcon },
  { value: 'bar', label: 'Bar Chart', icon: ChartBarIcon },
]

const selectedPeriod = ref<'lastMonth' | 'lastWeek' | 'today' | 'custom'>('lastMonth')
const chartType = ref<'line' | 'pie' | 'bar'>('line')
const barDirection = ref<'horizontal' | 'vertical'>('vertical')
const dropdownOpen = ref(false)

const selectChart = (option: ChartOption) => {
  chartType.value = option.value;
  dropdownOpen.value = false;
}

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
updateRange()

const formattedRange = computed(() => {
  if (!range.value.from || !range.value.to) return 'N/A'
  return `${format(range.value.from, 'dd/MM/yyyy')} → ${format(range.value.to, 'dd/MM/yyyy')}`
})

const chartData = ref<ChartData[]>([])

const generateData = () => {
  const from = range.value.from
  const to = range.value.to
  const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
  const data: ChartData[] = []
  
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

const background = computed(() => {
  return {
    fill: currentTheme.value === 'light' ? 'white' : '#1c2333'
  }
})

const series = computed(() => {
  if (chartType.value === 'bar') {
    /*const base = {
    type: chartType.value,
    xKey: 'date',
    yKey: 'value',
    yName: 'Valeur',
  }*/
    return [{
      type: 'bar',
      xKey: 'date',
      yKey: 'value',
      yName: 'Valeur',
      direction: barDirection.value,
      fill:'red'
    }]
  }
  if (chartType.value === 'pie') {
    return [{
      type: 'pie',
      calloutLabelKey: 'date',
      angleKey: 'value',
    }]
  }
  return [{
    type: 'line',
    xKey: 'date',
    yKey: 'value',
    yName: 'Valeur',
  }]
})

const chartConfig = computed(() => ({
  title: {
    text: props.title ?? 'Default Chart Title',
  },
  data: chartData.value,
  series: series.value,
  background:background.value,
} as any))
</script>
<template>
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{{ title }}</h2>
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
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Graphes</h2>
        <div class="flex items-center gap-2">
            <!-- Dropdown Button -->
            <button
            class="border rounded px-2 py-1 flex items-center gap-2"
            @mouseenter="dropdownOpen = !dropdownOpen"
            @click="dropdownOpen = !dropdownOpen"
            >
            <!-- Affichage dynamique du label et de l'icône -->
            <span>{{ availableChartTypes.find(option => option.value === chartType)?.label }}</span>
            <component
                :is="availableChartTypes.find(option => option.value === chartType)?.icon"
                class="h-4 w-4"
            />
            </button>
            <!-- Dropdown Menu -->
            <div
            @mouseleave="dropdownOpen = !dropdownOpen"
            v-if="dropdownOpen"
            class="absolute mt-2 bg-white border rounded shadow-md w-40 z-10"
            >
            <div
                v-for="option in availableChartTypes"
                :key="option.value"
                @click="selectChart(option)"
                class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
                <component :is="option.icon" class="h-4 w-4 mr-2" />
                <span>{{ option.label }}</span>
            </div>
            
            </div>  
                <!-- Bar Direction dropdown -->
            <div>
                <template v-if="chartType === 'bar'">
                    <select v-model="barDirection" class="border rounded px-2 py-1">
                        <option value="horizontal">Horizontal</option>
                        <option value="vertical">Vertical</option>
                    </select>
                </template>
            </div>
        </div>
    </div>
    <p class="text-sm text-gray-500 mb-4">Période : {{ formattedRange }}</p>
    <div>
      <ag-charts :options="chartConfig" />
    </div>
    
</template>