<script setup lang="ts">
import { ref, computed, watch, ComputedRef } from 'vue';
import { format, subDays, subMonths } from 'date-fns';
import { TrendingUp } from 'lucide-vue-next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AgCharts } from 'ag-charts-vue3';
import type { AgChartOptions } from 'ag-charts-community';

const selectedPeriod = ref<'lastMonth' | 'lastWeek' | 'today' | 'custom'>('lastMonth');
const customRange = ref({ from: '', to: '' });
const range = ref<{ from: Date; to: Date }>({ from: new Date(), to: new Date() });

const updateRange = () => {
  const now = new Date();
  switch (selectedPeriod.value) {
    case 'today':
      range.value = { from: now, to: now };
      break;
    case 'lastWeek':
      range.value = { from: subDays(now, 7), to: now };
      break;
    case 'lastMonth':
      range.value = { from: subMonths(now, 1), to: now };
      break;
    case 'custom':
      if (customRange.value.from && customRange.value.to) {
        range.value = {
          from: new Date(customRange.value.from),
          to: new Date(customRange.value.to),
        };
      }
      break;
  }
};

const coinData = [
  { name: 'BTC', volume: 1230000, trades: 267, price: 48325.75 },
  { name: 'ETH', volume: 830000, trades: 192, price: 2532.80 },
  { name: 'SOL', volume: 520000, trades: 145, price: 98.45 },
  { name: 'BNB', volume: 420000, trades: 87, price: 354.20 },
  { name: 'ADA', volume: 290000, trades: 63, price: 1.25 },
];

const coinIcons: { [key: string]: string } = {
  BTC: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/640px-Bitcoin.svg.png',
  ETH: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/langfr-250px-Ethereum-icon-purple.svg.png',
  SOL: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
  BNB: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3c8k70Yp1nJG5x8cApzT5mK57SKk8y5olWA&s',
  ADA: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtpzjjSrmtVAjdrAAckdsESsq3c3hy6OAIqw&s',
};

const formattedRange = computed(() => {
  if (!range.value.from || !range.value.to) return 'N/A';
  return `${format(range.value.from, 'dd/MM/yyyy')} → ${format(range.value.to, 'dd/MM/yyyy')}`;
});

const chartOptions = computed(() => ({
  title: {
    text: 'Most Traded Coins',
    fontSize: 18,
  },
  data: coinData,
  series: [{
    type: 'bar',
    xKey: 'name',
    yKey: 'volume',
    fill: '#22c55e',
    cornerRadius: 4,
    highlightStyle: {
      fill: '#16a34a',
      stroke: '#16a34a',
      strokeWidth: 2
    },
    tooltip: {
      renderer: (params: any) => {
        const coin = coinData.find(c => c.name === params.xValue);
        if (!coin) return { content: `$${params.yValue.toLocaleString()}` };
        return {
          title: coin.name,
          content: `
            <div class="p-2">
              <div class="font-bold">$${params.yValue.toLocaleString()}</div>
              <div class="text-sm">Volume</div>
              <div class="mt-1">Prix: $${coin.price.toLocaleString()}</div>
              <div class="text-sm">Trades: ${coin.trades}</div>
            </div>
          `
        };
      }
    }
  }],
  axes: [
    {
      type: 'category',
      position: 'bottom',
      title: { text: 'Coins' },
      label: { color: '#9ca3af' }
    },
    {
      type: 'number',
      position: 'left',
      title: { text: 'Volume ($)' },
      label: {
        color: '#9ca3af',
        formatter: (params: any) => {
          return `$${(params.value / 1000)}K`;
        }
      }
    }
  ],
  theme: {
    palette: {
      fills: ['#22c55e'],
      strokes: ['#22c55e']
    },
    overrides: {
      cartesian: {
        background: { fill: 'transparent' },
        series: {
          bar: {
            highlightStyle: {
              fill: '#16a34a',
              stroke: '#16a34a',
              strokeWidth: 2
            }
          }
        }
      }
    }
  },
  interactions: {
    enabled: true,
    tooltip: {
      enabled: true,
      delay: 100,
      class: 'custom-tooltip'
    },
    highlight: {
      enabled: true,
      series: {
        enabled: true,
        dimOpacity: 0.3
      }
    }
  }
})) as ComputedRef<AgChartOptions>;

watch([selectedPeriod, customRange], updateRange, { deep: true });
updateRange();
</script>

<template>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold flex items-center">
        <TrendingUp class="h-5 w-5 mr-2 text-green-500" />
        Most Traded Coins
      </h2>
      <div class="flex items-center gap-2">
        <select v-model="selectedPeriod" class="border rounded px-2 py-1 dark:bg-[#232b3e] dark:border-gray-700">
          <option value="lastMonth">Dernier mois</option>
          <option value="lastWeek">Dernière semaine</option>
          <option value="today">Aujourd'hui</option>
          <option value="custom">Personnalisée</option>
        </select>

        <template v-if="selectedPeriod === 'custom'">
          <input type="date" v-model="customRange.from" class="border rounded px-2 py-1 dark:bg-[#232b3e] dark:border-gray-700" />
          <span>→</span>
          <input type="date" v-model="customRange.to" class="border rounded px-2 py-1 dark:bg-[#232b3e] dark:border-gray-700" />
        </template>
      </div>
    </div>

    <p class="text-sm text-gray-500 mb-4">Période : {{ formattedRange }}</p>

    <ag-charts :options="chartOptions" />

    <div class="mt-4">
      <table class="w-full">
        <thead>
          <tr class="text-left text-xs text-gray-500 border-b dark:border-gray-700">
            <th class="pb-2">Coin</th>
            <th class="pb-2">Current Price</th>
            <th class="pb-2">Volume</th>
            <th class="pb-2">Trades</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coin in coinData" :key="coin.name" 
              class="border-b dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-[#232b3e] transition-colors duration-200 cursor-pointer">
            <td class="py-2">
              <div class="flex items-center">
                <Avatar class="h-6 w-6 mr-2">
                  <AvatarImage :src="coinIcons[coin.name]" />
                  <AvatarFallback>{{ coin.name.substring(0, 2) }}</AvatarFallback>
                </Avatar>
                <span class="font-medium">{{ coin.name }}</span>
              </div>
            </td>
            <td class="py-2">${{ coin.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</td>
            <td class="py-2">${{ coin.volume.toLocaleString() }}</td>
            <td class="py-2">{{ coin.trades }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<style scoped>
.dashboard-card {
  @apply bg-white dark:bg-[#1c2333] shadow-md;
}

:deep(.ag-chart-wrapper) {
  @apply dark:bg-[#1c2333];
}

:deep(.custom-tooltip) {
  @apply bg-white dark:bg-[#232b3e] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2;
}

:deep(.ag-chart-wrapper .ag-chart-canvas) {
  @apply cursor-pointer;
}

:deep(.ag-chart-wrapper .ag-chart-canvas:hover) {
  @apply opacity-90 transition-opacity duration-200;
}

:deep(.ag-chart-wrapper .ag-chart-canvas:active) {
  @apply opacity-80;
}
</style> 