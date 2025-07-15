<script setup lang="ts">
import DeleteUser from '../../components/DeleteUser.vue';
import HeadingSmall from '../../components/HeadingSmall.vue';
import InputError from '../../components/InputError.vue';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import AppLayout from '../../layouts/AppLayout.vue';
import SettingsLayout from '../../layouts/settings/Layout.vue';
import type { BreadcrumbItem } from '../../types/index.d.ts';
import { reactive } from 'vue';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

// Remplace la récupération de l'utilisateur par une valeur statique pour la démo
const user = reactive({
    name: 'Demo User',
    email: 'demo@example.com',
});

const form = reactive<{
  name: string;
  email: string;
  processing: boolean;
  errors: Record<string, string>;
}>({
  name: user.name,
  email: user.email,
  processing: false,
  errors: {},
});

const submit = () => {
    form.processing = true;
    setTimeout(() => {
        form.processing = false;
        // Simule la sauvegarde
    }, 1000);
};
</script>

<template>
    <AppLayout>
        <SettingsLayout :breadcrumbs="breadcrumbs">
            <HeadingSmall title="Profile" />
            <form @submit.prevent="submit" class="space-y-6">
                <div class="grid gap-2">
                    <Label for="name">Name</Label>
                    <Input id="name" type="text" v-model="form.name" required />
                    <InputError :message="form.errors?.name" />
                </div>
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" v-model="form.email" required />
                    <InputError :message="form.errors?.email" />
                </div>
                <Button type="submit" :disabled="form.processing">Save</Button>
            </form>
            <DeleteUser />
        </SettingsLayout>
    </AppLayout>
</template>
