<script setup lang="ts">
import AppLayout from '@/layouts/app/AppSidebarLayout.vue';
import type { BreadcrumbItemType } from '@/types';
import Toast from '@/components/ui/toast/Toast.vue'

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <div>
        <Toast />
        <AppLayout :breadcrumbs="breadcrumbs">
            <slot />
        </AppLayout>
    </div>
</template>
