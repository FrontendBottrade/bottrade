<script setup lang="ts">
import { Activity } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
  type: 'trade' | 'signal' | 'error' | 'system';
}

const props = defineProps<{
  logs: LogEntry[];
}>();

const getBadgeVariant = (type: string) => {
  switch (type) {
    case 'trade': return 'default';
    case 'signal': return 'outline';
    case 'error': return 'destructive';
    default: return 'secondary';
  }
};

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>

<template>
  <div class="bg-white rounded-xl shadow p-6 dark:bg-[#1c2333]">
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
      <h3 class="text-xl font-semibold flex items-center">
        <Activity class="h-5 w-5 mr-2 text-primary" />
        Bot Activity Logs
      </h3>
      <Select defaultValue="all">
        <SelectTrigger class="w-[120px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="trades">Trades</SelectItem>
          <SelectItem value="signals">Signals</SelectItem>
          <SelectItem value="errors">Errors</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="space-y-3">
      <div v-for="entry in logs" :key="entry.id" class="flex items-start p-2 rounded-md bg-secondary">
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <Badge :variant="getBadgeVariant(entry.type)" class="px-1.5 py-0 text-[10px]">
              {{ entry.type }}
            </Badge>
            <span class="text-xs text-muted-foreground">
              {{ formatTime(entry.timestamp) }}
            </span>
          </div>
          <p class="mt-1 text-sm">{{ entry.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template> 