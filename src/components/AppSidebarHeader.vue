<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItemType } from '@/types';
import { Moon, Sun, Monitor, Check } from 'lucide-vue-next';
import { useAppearance } from '@/composables/useAppearance';
import { onMounted, onBeforeUnmount, ref } from 'vue';

const { appearance, updateAppearance } = useAppearance();

defineProps<{
  breadcrumbs?: BreadcrumbItemType[];
}>();

interface ModeOption {
  value: 'light' | 'dark' | 'system';
  label: string;
  Icon: any;
}

const tabs: ModeOption[] = [
  { value: 'light', Icon: Sun, label: 'Light' },
  { value: 'dark', Icon: Moon, label: 'Dark' },
  { value: 'system', Icon: Monitor, label: 'System' },
];

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



</script>

<template>
  <header
    class="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:px-4"
  >
    <!-- Left side -->
    <div class="flex items-center gap-2">
      <SidebarTrigger class="-ml-1" />
      <template v-if="breadcrumbs?.length">
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
      </template>
    </div>

    <!-- Right side -->
    <div class="flex items-center gap-4">
      <!-- Dropdown -->
      <div class="relative inline-block">
        <button
          id="dropdown-toggle"
          @click="isOpen = !isOpen"
          :class="[
            'relative z-10 flex items-center p-2 focus:ring-opacity-40 rounded-md focus:outline-none border border-transparent',
            appearance === 'light'
              ? 'bg-white focus:ring-blue-300'
              : 'bg-gray-[#1c2333] text-white focus:ring-blue-400'
          ]"
        >
          <component :is="tabs.find(tab => tab.value === appearance)?.Icon" class="h-4 w-4 mr-2" />
          <svg class="w-5 h-5 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </button>

        <!-- Menu -->
        <div
          v-if="isOpen"
          id="dropdown-menu"
          class="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right rounded-md shadow-xl"
          :class="appearance === 'light' ? 'bg-white' : 'bg-gray-800 text-white'"
        >
          <div
            v-for="LabelIcon in tabs"
            :key="LabelIcon.value"
            @mouseenter="isOpen =true"
            @mouseleave="isOpen=false"
            @click="updateAppearance(LabelIcon.value)"
            :class="[
              'flex items-center justify-between gap-2 px-4 py-3 text-sm cursor-pointer transition-colors rounded-md',
              appearance === LabelIcon.value
                ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                : 'hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
            ]"
          >
            <div class="flex items-center gap-2">
              <component :is="LabelIcon.Icon" class="h-4 w-4" />
              <span>{{ LabelIcon.label }}</span>
            </div>
            <Check
              v-if="appearance === LabelIcon.value"
              class="h-4 w-4 text-green-500"
            />
          </div>
        </div>
      </div>

      <!-- Other Div -->

    </div>
  </header>
</template>
