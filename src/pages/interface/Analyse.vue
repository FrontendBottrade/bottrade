<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import AppHead from '@/components/AppHead.vue';
import { ChartCandlestick   } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analyse',
        href: '/interface/analyse',
        Icon: ChartCandlestick,
    },
];


  const loading = ref(false)
  const selection = ref(1)
  function reserve () {
    loading.value = true
    setTimeout(() => (loading.value = false), 2000)
  }
</script>

<template>
    <AppHead title="Analyse" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">   
        <v-card
            :disabled="loading"
            :loading="loading"
            class="mx-auto my-12"
            max-width="374"
        >
            <template v-slot:loader="{ isActive }">
            <v-progress-linear
                :active="isActive"
                color="deep-purple"
                height="4"
                indeterminate
            ></v-progress-linear>
            </template>

            <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            cover
            ></v-img>

            <v-card-item>
            <v-card-title>Cafe Badilico</v-card-title>

            <v-card-subtitle>
                <span class="me-1">Local Favorite</span>

                <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
                ></v-icon>
            </v-card-subtitle>
            </v-card-item>

            <v-card-text>
            <v-row
                align="center"
                class="mx-0"
            >
                <v-rating
                :model-value="4.5"
                color="amber"
                density="compact"
                size="small"
                half-increments
                readonly
                ></v-rating>

                <div class="text-grey ms-4">
                4.5 (413)
                </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
                $ • Italian, Cafe
            </div>

            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
            </v-card-text>

            <v-divider class="mx-4 mb-1"></v-divider>

            <v-card-title>Tonight's availability</v-card-title>

            <div class="px-4 mb-2">
            <v-chip-group v-model="selection" selected-class="bg-deep-purple-lighten-2">
                <v-chip>5:30PM</v-chip>

                <v-chip>7:30PM</v-chip>

                <v-chip>8:00PM</v-chip>

                <v-chip>9:00PM</v-chip>
            </v-chip-group>
            </div>

            <v-card-actions>
            <v-btn
                color="deep-purple-lighten-2"
                text="Reserve"
                block
                border
                @click="reserve"
            ></v-btn>
            </v-card-actions>
        </v-card>
            <!-- <div class="grid auto-rows-min gap-4 md:grid-cols-3">            
                <div class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <PlaceholderPattern />
                </div>
                <div class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <PlaceholderPattern />
                </div>
            </div>
            <div class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border md:min-h-min">
                <PlaceholderPattern />
            </div> -->

        </div>
    </AppLayout>
</template>