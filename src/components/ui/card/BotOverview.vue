<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Bot, Settings } from "lucide-vue-next";

interface Props {
  bot: {
    name: string;
    strategy: string;
    status: 'active' | 'inactive';
    performance: string;
    trades: number;
    pairs: string[];
    description: string;
  }
}

defineProps<Props>();

const handleBack = () => {
  emit('back');
};

const emit = defineEmits<{
  (e: 'back'): void;
}>();
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <!-- <div class="flex flex-col space-y-4">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-foreground">Trading Bots</h1>
        <Button class="flex items-center">
          <Plus class="mr-2 h-5 w-5" />
          New Bot
        </Button>
      </div>
      <p class="text-muted-foreground">
        Manage and monitor your automated trading bots
      </p>
    </div> -->
    <!-- Bot Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <Bot class="h-8 w-8 text-primary" />
        <div>
          <h2 class="text-2xl font-bold">{{ bot.name }}</h2>
          <p class="text-muted-foreground">Strategy: {{ bot.strategy }}</p>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <Button variant="outline" class="flex items-center">
          <Settings class="mr-2 h-4 w-4" />
          Configure
        </Button>
        <Button variant="destructive">
          Stop Bot
        </Button>
      </div>
    </div>

    <!-- Bot Description -->
    <div class="rounded-xl bg-card p-6 text-card-foreground shadow">
      <p class="text-muted-foreground">{{ bot.description }}</p>

      <div class="mt-6 grid grid-cols-4 gap-4">
        <div>
          <span class="text-sm text-muted-foreground">Status</span>
          <div>
            <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  :class="bot.status === 'active' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-800'">
              {{ bot.status === 'active' ? 'Active' : 'Inactive' }}
            </span>
          </div>
        </div>
        <div>
          <span class="text-sm text-muted-foreground">Performance</span>
          <div :class="{ 'text-emerald-500': bot.performance.startsWith('+'), 'text-red-500': bot.performance.startsWith('-') }">
            {{ bot.performance }}
          </div>
        </div>
        <div>
          <span class="text-sm text-muted-foreground">Total Trades</span>
          <div>{{ bot.trades }}</div>
        </div>
        <div>
          <span class="text-sm text-muted-foreground">Trading Pairs</span>
          <div class="text-sm">{{ bot.pairs.join(', ') }}</div>
        </div>
      </div>
    </div>
  </div>
</template> 