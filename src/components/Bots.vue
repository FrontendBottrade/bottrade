<script setup lang="ts">
import { computed, ref } from 'vue';
import { Plus, Bot, Settings, ChartBar, Save } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import BotCard from '@/components/ui/card/BotCard.vue';
import BotLogs from '@/components/ui/card/BotLogs.vue';

interface Bot {
  id: number;
  name: string;
  strategy: string;
  status: 'active' | 'inactive';
  performance: string;
  trades: number;
  lastActive: string;
  pairs: string[];
  description: string;
}

interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
  type: 'trade' | 'signal' | 'error' | 'system';
}

const bots = ref<Bot[]>([
  {
    id: 1,
    name: 'BTC Momentum',
    strategy: 'Momentum Trading',
    status: 'active',
    performance: '+14.2%',
    trades: 86,
    lastActive: '2 min ago',
    pairs: ['BTC/USD', 'ETH/USD'],
    description: 'Trading bot using momentum indicators to identify high-probability entry and exit points for Bitcoin.'
  },
  // ... autres bots
]);

const logEntries = ref<LogEntry[]>([
  {
    id: 1,
    timestamp: '2025-05-01T14:23:45',
    message: 'Buy order executed: BTC @ $82,450',
    type: 'trade'
  },
  // ... autres logs
]);

const selectedBot = ref<number | null>(null);
const activeTab = ref('performance');

const handleSaveSettings = () => {
  // Implémenter la logique de sauvegarde
};

const selectedBotData = computed(() => {
  return bots.value.find(bot => bot.id === selectedBot.value);
});
</script>

<template>
  <div class="container mx-auto p-6">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <p class="text-muted-foreground">
        Manage and monitor your automated trading bots
      </p>
      <Button>
        <Plus/> New Bot
      </Button>
    </div>

    <template v-if="selectedBot === null">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <BotCard
          v-for="bot in bots"
          :key="bot.id"
          :bot="bot"
          @select="selectedBot = $event"
        />
      </div>
    </template>

    <template v-else>
      <Button 
        variant="outline" 
        class="mb-6" 
        @click="selectedBot = null"
      >
        ← Back to All Bots
      </Button>
      
      <div v-if="selectedBotData">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div class="flex items-center">
            <Bot class="h-6 w-6 mr-3 text-primary" />
            <div>
              <h2 class="text-2xl font-bold">{{ selectedBotData.name }}</h2>
              <p class="text-muted-foreground">Strategy: {{ selectedBotData.strategy }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Settings class="h-4 w-4 mr-2" />
              Configure
            </Button>
            <Button 
              :variant="selectedBotData.status === 'active' ? 'destructive' : 'default'" 
              size="sm"
            >
              {{ selectedBotData.status === 'active' ? 'Stop Bot' : 'Activate Bot' }}
            </Button>
          </div>
        </div>

        <div class="mb-6">
          <div class="bg-white rounded-xl shadow p-6 dark:bg-[#1c2333]">
            <p class="text-muted-foreground">{{ selectedBotData.description }}</p>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div>
                <span class="text-sm text-gray-500">Status</span>
                <div>
                  <Badge
                    :variant="selectedBotData.status === 'active' ? 'default' : 'outline'"
                    :class="{ 'bg-primary': selectedBotData.status === 'active' }"
                  >
                    {{ selectedBotData.status === 'active' ? 'Active' : 'Inactive' }}
                  </Badge>
                </div>
              </div>
              <div>
                <span class="text-sm text-gray-500">Performance</span>
                <div :class="{ 'text-green-500': selectedBotData.performance.startsWith('+'), 'text-red-500': selectedBotData.performance.startsWith('-') }">
                  {{ selectedBotData.performance }}
                </div>
              </div>
              <div>
                <span class="text-sm text-gray-500">Total Trades</span>
                <div>{{ selectedBotData.trades }}</div>
              </div>
              <div>
                <span class="text-sm text-gray-500">Trading Pairs</span>
                <div class="text-sm">{{ selectedBotData.pairs.join(', ') }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs v-model="activeTab">
          <TabsList class="mb-6 w-full overflow-x-auto flex-nowrap">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance">
            <div class="bg-white rounded-xl shadow p-6 dark:bg-[#1c2333]">
              <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <h3 class="text-xl font-semibold flex items-center">
                  <ChartBar class="h-5 w-5 mr-2 text-primary" />
                  Performance Metrics
                </h3>
                <Select defaultValue="7d">
                  <SelectTrigger class="w-[120px]">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24h</SelectItem>
                    <SelectItem value="7d">7 days</SelectItem>
                    <SelectItem value="30d">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="h-[300px] flex items-center justify-center text-muted-foreground">
                Performance chart will be displayed here
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="logs">
            <BotLogs :logs="logEntries" />
          </TabsContent>
          
          <TabsContent value="settings">
            <div class="bg-white rounded-xl shadow p-6 dark:bg-[#1c2333]">
              <h3 class="text-xl font-semibold flex items-center mb-6">
                <Settings class="h-5 w-5 mr-2 text-primary" />
                Bot Settings
              </h3>
              
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <div class="space-y-2">
                      <Label for="botName">Bot Name</Label>
                      <Input id="botName" :value="selectedBotData.name" />
                    </div>
                    
                    <div class="space-y-2">
                      <Label for="strategy">Strategy</Label>
                      <Select :default-value="selectedBotData.strategy.toLowerCase().replace(/\s+/g, '-')">
                        <SelectTrigger>
                          <SelectValue placeholder="Select strategy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="momentum-trading">Momentum Trading</SelectItem>
                          <SelectItem value="moving-average-crossover">Moving Average Crossover</SelectItem>
                          <SelectItem value="bollinger-band-breakout">Bollinger Band Breakout</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div class="space-y-2">
                      <Label for="description">Description</Label>
                      <Textarea id="description" :value="selectedBotData.description" :rows="4" />
                    </div>
                  </div>
                  
                  <div class="space-y-4">
                    <div class="space-y-2">
                      <Label for="tradingPairs">Trading Pairs</Label>
                      <Select :default-value="selectedBotData.pairs[0]">
                        <SelectTrigger>
                          <SelectValue placeholder="Select trading pair" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BTC/USD">BTC/USD</SelectItem>
                          <SelectItem value="ETH/USD">ETH/USD</SelectItem>
                          <SelectItem value="SOL/USD">SOL/USD</SelectItem>
                          <SelectItem value="ADA/USD">ADA/USD</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" class="mt-2 w-full">
                        <Plus class="h-4 w-4 mr-2" /> Add Trading Pair
                      </Button>
                    </div>
                    
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <Label for="autoStart">Auto-start on signals</Label>
                        <Switch id="autoStart" default-checked />
                      </div>
                    </div>
                    
                    <div class="space-y-2">
                      <Label for="maxTrades">Max concurrent trades</Label>
                      <Input id="maxTrades" type="number" min="1" max="10" value="3" />
                    </div>
                    
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <Label for="testMode">Test mode (paper trading)</Label>
                        <Switch id="testMode" default-checked />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="flex justify-end">
                  <Button @click="handleSaveSettings">
                    <Save class="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </template>
  </div>
</template> 