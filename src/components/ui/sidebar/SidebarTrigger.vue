<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';
import { useSidebar } from './utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
  Icon?: any; // Le composant d'icône à injecter
}>();

const { toggleSidebar } = useSidebar();
</script>

<template>
  <Button
    data-sidebar="trigger"
    variant="ghost"
    size="icon"
    :class="cn('h-7 w-7', props.class)"
    @click="toggleSidebar"
  >
    <!-- Icône dynamique -->
    <component :is="props.Icon" />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
