<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import AppHead from '@/components/AppHead.vue';
import { BarChart, Plus, Settings, ChevronDown, ChevronUp, Save, FileStack, Target } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast/use-toast';

interface StrategyParameter {
  name: string;
  value: number | string | boolean;
}

interface Strategy {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  performance: string;
  trades: number;
  timeframe: string;
  parameters: StrategyParameter[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Strategie',
        href: '/interface/strategie',
        Icon: Target,
    },
];

const strategies: Strategy[] = [
  {
    id: 1,
    name: 'Momentum Trading',
    description: 'Capitalizes on market continuation patterns using technical indicators to identify strong price trends.',
    status: 'active',
    performance: '+12.5%',
    trades: 73,
    timeframe: '1h',
    parameters: [
      { name: 'RSI Period', value: 14 },
      { name: 'RSI Overbought', value: 70 },
      { name: 'RSI Oversold', value: 30 },
      { name: 'Volume Factor', value: 1.5 }
    ]
  },
  {
    id: 2,
    name: 'Moving Average Crossover',
    description: 'Uses crosses of short-term and long-term moving averages to identify trend changes and generate signals.',
    status: 'inactive',
    performance: '+8.2%',
    trades: 42,
    timeframe: '4h',
    parameters: [
      { name: 'Fast MA Period', value: 9 },
      { name: 'Slow MA Period', value: 21 },
      { name: 'Signal MA Period', value: 9 },
      { name: 'MA Type', value: 'Exponential' }
    ]
  },
  {
    id: 3,
    name: 'Bollinger Band Breakout',
    description: 'Identifies market volatility and potential price breakouts using Bollinger Bands.',
    status: 'inactive',
    performance: '+5.7%',
    trades: 31,
    timeframe: '1d',
    parameters: [
      { name: 'BB Period', value: 20 },
      { name: 'BB Standard Deviation', value: 2 },
      { name: 'BB MA Type', value: 'Simple' },
      { name: 'Volume Confirmation', value: true }
    ]
  },
];

const isDialogOpen = ref(false);
const isConfigureDialogOpen = ref(false);
const currentStrategy = ref<Strategy | null>(null);
const expandedParameters = ref<number[]>([]);
const { toast } = useToast();

const toggleParameters = (strategyId: number) => {
  if (expandedParameters.value.includes(strategyId)) {
    expandedParameters.value = expandedParameters.value.filter(id => id !== strategyId);
  } else {
    expandedParameters.value.push(strategyId);
  }
};

const openConfigureModal = (strategy: Strategy) => {
  currentStrategy.value = strategy;
  isConfigureDialogOpen.value = true;
};

const handleSaveConfig = () => {
  toast({
    title: "Strategy updated",
    description: "Your strategy configuration has been saved successfully.",
  });
  isConfigureDialogOpen.value = false;
};

const selectedTimeframe = ref('');
const selectedType = ref('');
</script>

<template>
    <AppHead title="Strategie" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">   
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <p class="text-muted-foreground">
                    Configure and manage your automated trading strategies
                </p>
                <Dialog v-model:open="isDialogOpen">
                    <DialogTrigger as-child>
                        <Button>
                            <Plus class="mr-2 h-4 w-4" /> New Strategy
                        </Button>
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>Create New Strategy</DialogTitle>
                            <DialogDescription>
                                Define a new trading strategy that can be assigned to bots.
                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-4 py-4">
                            <div class="grid grid-cols-4 items-center gap-4">
                                <label for="name" class="text-right text-sm font-medium">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    placeholder="Enter strategy name"
                                    class="col-span-3"
                                />
                            </div>
                            <div class="grid grid-cols-4 items-center gap-4">
                                <label for="timeframe" class="text-right text-sm font-medium">
                                    Timeframe
                                </label>
                                <Select v-model="selectedTimeframe">
                                    <SelectTrigger class="col-span-3">
                                        <SelectValue placeholder="Select timeframe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1m">1 minute</SelectItem>
                                        <SelectItem value="5m">5 minutes</SelectItem>
                                        <SelectItem value="15m">15 minutes</SelectItem>
                                        <SelectItem value="1h">1 hour</SelectItem>
                                        <SelectItem value="4h">4 hours</SelectItem>
                                        <SelectItem value="1d">1 day</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="grid grid-cols-4 items-center gap-4">
                                <label for="type" class="text-right text-sm font-medium">
                                    Type
                                </label>
                                <Select v-model="selectedType">
                                    <SelectTrigger class="col-span-3">
                                        <SelectValue placeholder="Select strategy type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="trend">Trend Following</SelectItem>
                                        <SelectItem value="momentum">Momentum</SelectItem>
                                        <SelectItem value="breakout">Breakout</SelectItem>
                                        <SelectItem value="mean-reversion">Mean Reversion</SelectItem>
                                        <SelectItem value="pattern">Pattern Recognition</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="grid grid-cols-4 items-center gap-4">
                                <label for="description" class="text-right text-sm font-medium">
                                    Description
                                </label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe your strategy"
                                    class="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" @click="isDialogOpen = false">
                                Cancel
                            </Button>
                            <Button type="submit" @click="isDialogOpen = false">
                                Create Strategy
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            
            <div class="space-y-6">
                <Card v-for="strategy in strategies" :key="strategy.id" class="dashboard-card hover:border-primary/50 transition-all">
                    <CardHeader>
                        <div class="flex justify-between items-start">
                            <div>
                                <CardTitle class="flex items-center">
                                    <BarChart class="h-5 w-5 mr-2 text-primary" />
                                    {{ strategy.name }}
                                </CardTitle>
                                <CardDescription class="mt-2 max-w-2xl">
                                    {{ strategy.description }}
                                </CardDescription>
                            </div>
                            <Badge
                                :variant="strategy.status === 'active' ? 'default' : 'outline'"
                                :class="strategy.status === 'active' ? 'bg-primary' : ''"
                            >
                                {{ strategy.status === 'active' ? 'In Use' : 'Not Used' }}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <span class="stats-label">Performance</span>
                                <div class="stats-value profit-text">{{ strategy.performance }}</div>
                            </div>
                            <div>
                                <span class="stats-label">Total Trades</span>
                                <div class="stats-value">{{ strategy.trades }}</div>
                            </div>
                            <div>
                                <span class="stats-label">Timeframe</span>
                                <div class="stats-value">{{ strategy.timeframe }}</div>
                            </div>
                        </div>
                        
                        <div v-if="expandedParameters.includes(strategy.id)" class="mt-4 mb-6 p-4 bg-secondary/30 rounded-md">
                            <h4 class="font-medium mb-3">Strategy Parameters</h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                <div v-for="(param, idx) in strategy.parameters" :key="idx" class="bg-secondary/50 p-3 rounded-md">
                                    <div class="stats-label">{{ param.name }}</div>
                                    <div class="text-base font-medium">{{ param.value.toString() }}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <Button 
                                variant="outline" 
                                size="sm"
                                @click="toggleParameters(strategy.id)"
                            >
                                <ChevronUp v-if="expandedParameters.includes(strategy.id)" class="h-4 w-4 mr-2" />
                                <ChevronDown v-else class="h-4 w-4 mr-2" />
                                {{ expandedParameters.includes(strategy.id) ? 'Hide Parameters' : 'Show Parameters' }}
                            </Button>
                            
                            <div class="flex space-x-3">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    @click="openConfigureModal(strategy)"
                                >
                                    <Settings class="h-4 w-4 mr-2" />
                                    Configure
                                </Button>
                                <Button size="sm">
                                    Use Strategy
                                </Button>
                </div>
                </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog v-model:open="isConfigureDialogOpen">
                <DialogContent class="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <template v-if="currentStrategy">
                        <DialogHeader>
                            <DialogTitle>Configure Strategy: {{ currentStrategy.name }}</DialogTitle>
                            <DialogDescription>
                                Customize parameters to optimize your trading strategy.
                            </DialogDescription>
                        </DialogHeader>
                        
                        <div class="py-4 space-y-6">
                            <div class="space-y-4">
                                <div class="grid grid-cols-1 gap-4">
                                    <div>
                                        <label class="text-sm font-medium">Strategy Name</label>
                                        <Input :default-value="currentStrategy.name" class="mt-1" />
                                    </div>
                                    
                                    <div>
                                        <label class="text-sm font-medium">Timeframe</label>
                                        <Select :default-value="currentStrategy.timeframe">
                                            <SelectTrigger class="mt-1">
                                                <SelectValue placeholder="Select timeframe" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1m">1 minute</SelectItem>
                                                <SelectItem value="5m">5 minutes</SelectItem>
                                                <SelectItem value="15m">15 minutes</SelectItem>
                                                <SelectItem value="1h">1 hour</SelectItem>
                                                <SelectItem value="4h">4 hours</SelectItem>
                                                <SelectItem value="1d">1 day</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 class="text-base font-semibold mb-3">Strategy Parameters</h3>
                                <div class="space-y-4">
                                    <div v-for="(param, idx) in currentStrategy.parameters" :key="idx" class="flex items-center gap-4">
                                        <label class="w-1/3 text-sm font-medium">{{ param.name }}</label>
                                        <Select v-if="typeof param.value === 'boolean'" :default-value="param.value ? 'true' : 'false'">
                                            <SelectTrigger class="w-2/3">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Enabled</SelectItem>
                                                <SelectItem value="false">Disabled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select v-else-if="typeof param.value === 'string'" :default-value="param.value">
                                            <SelectTrigger class="w-2/3">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Simple">Simple</SelectItem>
                                                <SelectItem value="Exponential">Exponential</SelectItem>
                                                <SelectItem value="Weighted">Weighted</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input 
                                            v-else
                                            type="number" 
                                            :default-value="param.value" 
                                            class="w-2/3" 
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <label class="text-sm font-medium">Strategy Description</label>
                                <Textarea 
                                    :default-value="currentStrategy.description" 
                                    :rows="3"
                                    class="mt-1"
                                />
                            </div>
                        </div>
                        
                        <DialogFooter>
                            <Button variant="outline" @click="isConfigureDialogOpen = false">
                                Cancel
                            </Button>
                            <Button @click="handleSaveConfig">
                                <Save class="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </template>
                </DialogContent>
            </Dialog>
        </div>
    </AppLayout>
</template>