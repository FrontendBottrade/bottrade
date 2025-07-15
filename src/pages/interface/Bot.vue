<script setup lang="ts">
import { ref, computed } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import AppHead from '@/components/AppHead.vue';
import BotCard from '@/components/ui/card/BotCard.vue';
import BotOverview from '@/components/ui/card/BotOverview.vue';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-vue-next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Bot } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Bot',
        href: '/interface/bot',
        Icon: Bot,
    },
];

const selectedBot = ref<number | null>(null);
const activeTab = ref('performance');

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
    runningTime: string;
    todayTrades: number;
    todayPL: string;
}

const bots = ref<Bot[]>([
    {
        id: 1,
        name: 'BTC Momentum',
        strategy: 'Momentum Trading',
        status: 'active' as const,
        performance: '+14.2%',
        trades: 86,
        lastActive: '2 min ago',
        pairs: ['BTC/USD', 'ETH/USD'],
        description: 'Trading bot using momentum indicators for Bitcoin.',
        runningTime: '14h 23m',
        todayTrades: 12,
        todayPL: '+$247.32'
    },
    {
        id: 2,
        name: 'ETH Scalper',
        strategy: 'Scalping',
        status: 'inactive' as const,
        performance: '+5.8%',
        trades: 142,
        lastActive: '1 hour ago',
        pairs: ['ETH/USD'],
        description: 'High-frequency trading bot for Ethereum.',
        runningTime: '0h 0m',
        todayTrades: 0,
        todayPL: '$0.00'
    },
    {
        id: 3,
        name: 'Multi-Pair Bot',
        strategy: 'Grid Trading',
        status: 'active' as const,
        performance: '+9.3%',
        trades: 234,
        lastActive: '5 min ago',
        pairs: ['BTC/USD', 'ETH/USD', 'SOL/USD'],
        description: 'Grid trading strategy across multiple pairs.',
        runningTime: '6h 45m',
        todayTrades: 28,
        todayPL: '+$183.45'
    }
]);

const selectedBotData = computed(() => {
    return bots.value.find(bot => bot.id === selectedBot.value);
});

const handleBotSelect = (botId: number) => {
    selectedBot.value = botId;
};

const handleBack = () => {
    selectedBot.value = null;
};

const logs = ref([
    {
        id: 1,
        type: 'trade',
        message: 'Buy order executed: BTC @ $82,450',
        timestamp: '14:23'
    },
    {
        id: 2,
        type: 'trade',
        message: 'Sell order executed: ETH @ $4,320',
        timestamp: '14:15'
    },
    {
        id: 3,
        type: 'signal',
        message: 'Strategy condition met: Moving Average Crossover',
        timestamp: '13:58'
    },
    {
        id: 4,
        type: 'error',
        message: 'API connection error: Retrying...',
        timestamp: '13:47'
    },
    {
        id: 5,
        type: 'system',
        message: 'Bot started with Bollinger Breakout strategy',
        timestamp: '13:32'
    }
]);
</script>

<template>
    <AppHead title="Bot" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 p-4">   
            <template v-if="!selectedBot">
                <div class="flex flex-col space-y-4">
                    <div class="flex items-center justify-between">
                        <h1 class="text-3xl font-bold text-foreground">Trading Bots</h1>
                        <Button class="flex items-center">
                            <Plus class="text-green-500" />
                            New Bot
                        </Button>
                    </div>
                    <p class="text-muted-foreground">
                        Manage and monitor your automated trading bots
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <BotCard
                        v-for="bot in bots"
                        :key="bot.id"
                        :bot="bot"
                        @select="handleBotSelect"
                    />
                </div>
            </template>

            <template v-else-if="selectedBotData">
                <Button 
                    variant="outline" 
                    class="mb-6 w-fit" 
                    @click="handleBack"
                >
                    <ArrowLeft class="h-4 w-4 mr-2" />
                    Back to All Bots
                </Button>
                
                <BotOverview :bot="selectedBotData" />

                <Tabs v-model="activeTab" class="w-full mt-6">
                    <TabsList class="w-full bg-card border-b">
                        <TabsTrigger value="performance">Performance</TabsTrigger>
                        <TabsTrigger value="activity">Activity Logs</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="performance" class="mt-6">
                        <div class="flex items-center justify-between">
                            <h2 class="text-xl font-semibold flex items-center gap-2">
                                <span class="text-primary">📊</span> Performance Metrics
                            </h2>
                            <Select defaultValue="7d">
                                <SelectTrigger class="w-[180px]">
                                    <SelectValue placeholder="Select period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="24h">Last 24 hours</SelectItem>
                                    <SelectItem value="7d">Last 7 days</SelectItem>
                                    <SelectItem value="30d">Last 30 days</SelectItem>
                                    <SelectItem value="all">All time</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="h-[400px] flex items-center justify-center text-muted-foreground mt-6">
                            Performance chart will be displayed here
                </div>
                    </TabsContent>

                    <TabsContent value="activity" class="mt-6">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-xl font-semibold flex items-center gap-2">
                                <span class="text-primary">📝</span> Bot Activity Logs
                            </h2>
                            <Select defaultValue="all">
                                <SelectTrigger class="w-[180px]">
                                    <SelectValue placeholder="Filter logs" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All logs</SelectItem>
                                    <SelectItem value="trades">Trades only</SelectItem>
                                    <SelectItem value="signals">Signals only</SelectItem>
                                    <SelectItem value="errors">Errors only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="space-y-4">
                            <div v-for="log in logs" :key="log.id" 
                                class="flex items-center justify-between p-4 rounded-lg bg-card border">
                                <div class="flex items-center gap-3">
                                    <Badge :variant="log.type === 'trade' ? 'default' : 'outline'">
                                        {{ log.type }}
                                    </Badge>
                                    <span>{{ log.message }}</span>
                                </div>
                                <span class="text-sm text-muted-foreground">{{ log.timestamp }}</span>
                            </div>
            </div>
                    </TabsContent>

                    <TabsContent value="settings" class="mt-6">
                        <div class="flex items-center mb-6">
                            <h2 class="text-xl font-semibold flex items-center gap-2">
                                <span class="text-primary">⚙️</span> Bot Settings
                            </h2>
                        </div>
                        <div class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-4">
                                    <div>
                                        <Label>Bot Name</Label>
                                        <Input :value="selectedBotData.name" />
                                    </div>
                                    <div>
                                        <Label>Strategy</Label>
                                        <Select :defaultValue="selectedBotData.strategy">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="momentum">Momentum Trading</SelectItem>
                                                <SelectItem value="grid">Grid Trading</SelectItem>
                                                <SelectItem value="scalping">Scalping</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <Textarea 
                                            :value="selectedBotData.description"
                                            :rows="4"
                                        />
                                    </div>
                                </div>
                                <div class="space-y-4">
                                    <div>
                                        <Label>Trading Pairs</Label>
                                        <div class="space-y-2">
                                            <div v-for="pair in selectedBotData.pairs" :key="pair"
                                                class="flex items-center gap-2">
                                                <Select :defaultValue="pair">
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="BTC/USD">BTC/USD</SelectItem>
                                                        <SelectItem value="ETH/USD">ETH/USD</SelectItem>
                                                        <SelectItem value="SOL/USD">SOL/USD</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Button variant="outline" size="icon">
                                                    <span class="text-red-500">×</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <Button variant="outline" class="w-full mt-2">
                                            + Add Trading Pair
                                        </Button>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <Label>Auto-start on signals</Label>
                                        <Switch :defaultChecked="true" />
                                    </div>
                                    <div>
                                        <Label>Max concurrent trades</Label>
                                        <Input type="number" :value="3" min="1" max="10" />
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <Label>Test mode (paper trading)</Label>
                                        <Switch :defaultChecked="true" />
                                    </div>
            </div>
                </div>
                            <div class="flex justify-end">
                                <Button>
                                    Save Settings
                                </Button>
                </div>
            </div>
                    </TabsContent>
                </Tabs>
            </template>
        </div>
    </AppLayout>
</template>