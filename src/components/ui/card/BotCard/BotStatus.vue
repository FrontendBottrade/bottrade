<script setup lang="ts">
import { Bot, Check, X, Coins, Cpu, Activity, Moon, Sun, Monitor } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import { useAppearance } from '@/composables/useAppearance';
import { onBeforeUnmount, onMounted, ref } from 'vue';
const { appearance, updateAppearance } = useAppearance();

interface ModeOption {
  value: 'light' | 'dark' | 'system';
  label: string;
  Icon: any;
}

const tabs:ModeOption[]= [
  { value: 'light', Icon: Sun, label: 'Light' },
  { value: 'dark', Icon: Moon, label: 'Dark' },
  { value: 'system', Icon: Monitor, label: 'System' },
]
const chartType = ref<'line' | 'pie' | 'bar'>('line')

const selectMode = (option: ModeOption) => {
  updateAppearance(option.value);
  isOpen.value = false; // Fermer le dropdown après la sélection
}


const isOpen = ref(false);

// Gestion du clic extérieur
function handleClickOutside(event: MouseEvent) {
  const dropdown = document.getElementById('dropdown-menu');
  const toggle = document.getElementById('dropdown-toggle');

  if (dropdown && toggle && !dropdown.contains(event.target as Node) && !toggle.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});


defineProps({
  activeBots: {
    type: Number,
    required: true,
    default: 0
  },
  inactiveBots: {
    type: Number,
    required: true,
    default: 0
  },
  dailyTrades: {
    type: Number,
    required: true,
    default: 0
  },
  cpuUsage: {
    type: String,
    required: true,
    default: '0%'
  },
  uptime: {
    type: String,
    required: true,
    default: '0%'
  }
});
</script>

<template>
  <div :class="['rounded-xl shadow-md shadow-slate-700 p-6',
    appearance === 'light'
  ?'bg-white text-black border-gray-200'
  :'bg-[#1c2333] text-white border-gray-700'
  ]
  ">
  <!--   ' bg-white dark:bg-[#1c2333] shadow-md p-6 text-black dark:text-white border border-gray-200 dark:border-gray-700' -->
    <div class="pb-2 flex justify-between items-center">
      <h2 class="flex items-center text-lg text-center font-semibold">
        <Bot class="mr-2 text-green-500" />
        Bot Status Overview
      </h2>
      
      <!-- <div class="inline-flex gap-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-1">
        <button
          v-for="{ value, Icon, label } in tabs"
          :key="value"
          @click="updateAppearance(value)"
          :class="[
            'flex items-center rounded-md px-2 py-1 transition-colors',
            appearance === value
              ? 'bg-white shadow-sm dark:bg-neutral-700 dark:text-neutral-100'
              : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
          ]"
        >
          <component :is="Icon" class="h-4 w-4" />
        </button>
      </div> -->
    </div>
    <div class="space-y-3">
      <div class="text-center">
        <div class="text-3xl font-bold">{{ activeBots + inactiveBots }}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">Total Bots</div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div class="text-center">
          <div class="flex items-center  justify-center text-xl font-bold text-green-500">
            <i class="fi fi-ts-user-robot text-green-400 text-lg mr-2"></i>
            {{ activeBots }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Active</div>
        </div>
        <div class="text-center">
          <div class="flex items-center justify-center text-xl font-bold text-red-500 dark:text-gray-400">
            <i class="fi fi-ts-user-robot-xmarks text-red-500 text-lg mr-2"></i>
            {{ inactiveBots }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Inactive</div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2 mt-2 bg-gray-100 dark:bg-[#232b3e] p-3 rounded-md">
        <div class="text-center">
          <div class="flex items-center justify-center text-green-500 mb-1">
            <Activity class="h-4 w-4" />
          </div>
          <div class="text-sm font-medium">{{ dailyTrades }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Today's Trades</div>
        </div>
        <div class="text-center">
          <div class="flex items-center justify-center text-green-500 mb-1">
            <Cpu class="h-4 w-4" />
          </div>
          <div class="text-sm font-medium">{{ cpuUsage }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">CPU Usage</div>
        </div>
        <div class="text-center">
          <div class="flex items-center justify-center text-green-500 mb-1">
            <Coins class="h-4 w-4" />
          </div>
          <div class="text-sm font-medium">{{ uptime }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Uptime</div>
        </div>
      </div>

      <div class="mt-4">
        <RouterLink to="/interface/bot" class="w-full flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-[#232b3e] transition-colors">
          <Bot class="h-4 w-4 mr-2" />
          View All Bots
        </RouterLink>
        <!-- <a href="/bots" class="w-full flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-[#232b3e] transition-colors">
          <Bot class="h-4 w-4 mr-2" />
          View All Bots
        </a> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.pulse-animation {
  position: relative;
}

.pulse-animation::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background-color: rgba(34, 197, 94, 0.4);
  animation: pulse 1.5s ease-in-out infinite;
  z-index: 0;
}

.pulse-animation > * {
  position: relative;
  z-index: 10;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 1;
  }
  70% {
    transform: scale(1.6);
    opacity: 0;
  }
  100% {
    transform: scale(0.95);
    opacity: 0;
  }
}
</style>
  

  