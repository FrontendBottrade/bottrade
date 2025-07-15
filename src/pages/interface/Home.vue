<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Pages disponibles</h1>
      <ul class="list-disc ml-6">
        <li v-for="page in availablePages" :key="page">
          <a :href="`/${page.toLowerCase()}`" class="text-blue-600 hover:underline">
            {{ page }}
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    availablePages: string[];
  }>();
  </script>
  