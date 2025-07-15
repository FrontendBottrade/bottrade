<script setup lang="ts">
import { ref,computed, watch } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import AppHead from '@/components/AppHead.vue';
import { LayoutGrid, Home } from 'lucide-vue-next';
import BotStatus from '@/components/ui/card/BotCard/BotStatus.vue';
import { format, subDays, subMonths } from 'date-fns'
import CustomGraphe from '@/components/ui/card/CustomGraphe.vue';
import MostTradedCoins from '@/components/ui/card/MostTradedCoins.vue';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/interface/dashboard',
        Icon: Home,
    },
];

import { useAppearance, getEffectiveTheme } from '@/composables/useAppearance';

const { appearance} = useAppearance();

const currentTheme = computed(() => getEffectiveTheme(appearance.value));




const activeBots = ref(5);
const inactiveBots = ref(3);


const dailyTrades = ref(42);
const cpuUsage = ref('23%');
const uptime = ref('99.7%');

/*interface ChartOption {
  value: 'line' | 'bar' | 'donut' | 'multiple';
  label: string;
  icon: any;
}

const chartOptions: ChartOption[] = [
  { value: 'line', label: 'Line Chart', icon: ChartLineIcon },
  { value: 'donut', label: 'Donut Chart', icon: ChartPieIcon },
  { value: 'bar', label: 'Bar Chart', icon: ChartBarIcon },
  //{ value: 'multiple', label: 'Multiple Chart', icon: ViewIcon }
]
   const chartType=ref<'line' | 'donut' | 'bar' | 'multiple'>('line')
  const barDirection = ref<'horizontal' | 'vertical'>('horizontal')
  const dropdownOpen = ref(false);*/
  const selectedPeriod = ref<'lastMonth' | 'lastWeek' | 'today' | 'custom'>('lastMonth')
 

// Sélectionner un type de graphique
/*const selectChart = (option: ChartOption) => {
    chartType.value = option.value;
  dropdownOpen.value = false; // Fermer le menu après sélection
};*/  


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
  updateRange() // <<== ajoute cette ligne juste après
  /*const formattedRange = computed(() => {
    if (!range.value.from || !range.value.to) return 'N/A'
    return `${format(range.value.from, 'dd/MM/yyyy')} → ${format(range.value.to, 'dd/MM/yyyy')}`
  })

*/

const chartData = ref<any[]>([])
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

<template>
    <AppHead title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 ">   
            <div class="grid grid-cols-12 gap-4 w-100">
                <!-- Bot Status -->
                <div class="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3">
                    <BotStatus 
                        :active-bots="activeBots"
                        :inactive-bots="inactiveBots"
                        :daily-trades="dailyTrades"
                        :cpu-usage="cpuUsage"
                        :uptime="uptime"
                    />
                </div>
                <!-- Custom Graph -->
                <div :class="['col-span-12 sm:col-span-12 lg:col-span-4 xl:col-span-6',
                  currentTheme === 'light'
                        ?'bg-white text-black border-gray-200 shadow-slate-700'
                        :'bg-[#1c2333] text-white border-gray-700 shadow-slate-100'
                ]">
                    <div :class="['rounded-xl p-6 max-w-4xl mx-auto shadow-md',
                      currentTheme === 'light'
                        ?'bg-white text-black border-gray-200 shadow-slate-700'
                        :'bg-[#1c2333] text-white border-gray-700 shadow-md shadow-slate-700'
                    ]">
                        <CustomGraphe
                            title="Profit Stat"
                        />
                    </div>
                </div>

                <!-- Most Traded Coins -->
                <div class="col-span-12 sm:col-span-12 lg:col-span-4 xl:col-span-6">
                  <div :class="['rounded-xl shadow p-6 max-w-4xl mx-auto',
                  currentTheme === 'light'
                        ?'bg-white text-black border-gray-200 shadow-slate-700'
                        :'bg-[#1c2333] text-white border-gray-700 shadow-slate-100'] ">
                    <MostTradedCoins />
                  </div>
                </div>
            </div>
            <!-- <div class="grid auto-rows-min gap-4 md:grid-cols-3">            
                <div class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <PlaceholderPattern />
                </div>
                <div class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <PlaceholderPattern />
                </div>
            </div>
            <div class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border md:min-h-min">
                <PlaceholderPattern />
            </div> -->

        </div>
    </AppLayout>
</template>

<style scoped>
/* Style pour le dropdown */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>