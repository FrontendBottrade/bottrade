<script setup lang="ts">
import { RouterLink } from 'vue-router';

interface Props {
    to: string;
    tabindex?: number;
    external?: boolean;
}

defineProps<Props>();
</script>

<template>
    <RouterLink
        v-if="!external"
        :to="to"
        :tabindex="tabindex"
        class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:!decoration-current dark:decoration-neutral-500"
    >
        <slot />
    </RouterLink>
    <a
        v-else
        :href="to"
        :tabindex="tabindex"
        class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:!decoration-current dark:decoration-neutral-500"
    >
        <slot />
    </a>
</template>
