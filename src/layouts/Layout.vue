<script setup lang="ts">
// Pas d'import Inertia
</script>

<template>
    <div>
        <header class="bg-indigo-500 text-white">
            <nav class="flex items-center justify-between p-4 max-w-screen-lg mx-auto">
                <div class="space-x-6">
                    <router-link to="/" class="text-white hover:text-gray-200">Accueil</router-link>
                    <router-link to="/about" class="text-white hover:text-gray-200">About</router-link>
                </div>
            </nav>
        </header>
        <main class="p-4">
            <slot />
        </main>
    </div>
</template>