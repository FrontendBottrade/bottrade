<script setup lang="ts">
import { Bot } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-vue-next';
import { useAppearance } from '@/composables/useAppearance';
const { appearance, updateAppearance } = useAppearance();

// Interface définissant la structure d'un bot
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

// Props reçues du composant parent
const props = defineProps<{
  bot: Bot;
}>();

// Définition des événements que ce composant peut émettre vers son parent
// Ici, on définit un événement 'select' qui envoie un id (nombre)
const emit = defineEmits<{
  (e: 'select', id: number): void;
}>();

// Fonction appelée lors du clic sur le bouton "Details"
// Elle émet l'événement 'select' vers le parent avec l'id du bot
const handleSelect = () => {
  emit('select', props.bot.id);
};
</script>

<template>
  <div class="rounded-xl shadow p-6 hover:border-primary/50 transition-all"
       :class="[ bot.status === 'active' ? 'border-l-4 border-l-primary':'',
        appearance === 'light'
  ?'bg-white text-black border-gray-200'
  :'bg-[#1c2333] text-white border-gray-700'
        ]">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-xl font-semibold flex items-center">
          <Bot class="h-5 w-5 mr-2 text-primary" />
          {{ bot.name }}
        </h3>
        <p class="text-sm text-gray-500 mt-1">
          Strategy: {{ bot.strategy }}
        </p>
      </div>
      <Badge
        :variant="bot.status === 'active' ? 'default' : 'outline'"
        :class="{ 'bg-green-500': bot.status === 'active' }"
      >
        {{ bot.status === 'active' ? 'Active' : 'Inactive' }}
      </Badge>
    </div>

    <div class="grid grid-cols-2 gap-4 my-4">
      <div>
        <span class="text-sm text-gray-500">Pairs</span>
        <div class="text-sm">
          {{ bot.pairs.join(', ') }}
        </div>
      </div>
      <div>
        <span class="text-sm text-gray-500">Performance</span>
        <div :class="{ 'text-green-500': bot.performance.startsWith('+'), 'text-red-500': bot.performance.startsWith('-') }">
          {{ bot.performance }}
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <span class="text-sm text-gray-500">Trades</span>
        <div>{{ bot.trades }}</div>
      </div>
      <div>
        <span class="text-sm text-gray-500">Last Active</span>
        <div class="text-sm">{{ bot.lastActive }}</div>
      </div>
    </div>
    
    <div class="flex justify-end space-x-3">
      <!-- Bouton qui déclenche handleSelect lors du clic -->
      <Button variant="outline" size="sm" @click="handleSelect">
        <FileText class="h-4 w-4 mr-2" />
        Details
      </Button>
      <Button 
        :variant="bot.status === 'active' ? 'destructive' : 'default'" 
        size="sm"
      >
        {{ bot.status === 'active' ? 'Stop' : 'Activate' }}
      </Button>
    </div>
  </div>
</template> 