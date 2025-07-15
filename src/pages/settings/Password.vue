<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import { reactive, ref } from 'vue';

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

const form = reactive({
    current_password: '',
    password: '',
    password_confirmation: '',
    processing: false,
    errors: {},
});
const status = ref('');

const updatePassword = () => {
    form.processing = true;
    setTimeout(() => {
        form.processing = false;
        status.value = 'Mot de passe mis à jour (démo)';
    }, 1000);
};
</script>

<template>
    <AppLayout>
        <SettingsLayout :breadcrumbs="breadcrumbItems">
            <HeadingSmall>Password</HeadingSmall>
            <form @submit.prevent="updatePassword" class="space-y-6">
                <div class="grid gap-2">
                    <Label for="current_password">Current password</Label>
                    <Input id="current_password" type="password" v-model="form.current_password" required />
                    <InputError :message="form.errors?.current_password" />
                </div>
                <div class="grid gap-2">
                    <Label for="password">New password</Label>
                    <Input id="password" type="password" v-model="form.password" required />
                    <InputError :message="form.errors?.password" />
                </div>
                <div class="grid gap-2">
                    <Label for="password_confirmation">Confirm new password</Label>
                    <Input id="password_confirmation" type="password" v-model="form.password_confirmation" required />
                    <InputError :message="form.errors?.password_confirmation" />
                </div>
                <Button type="submit" :disabled="form.processing">Update password</Button>
            </form>
        </SettingsLayout>
    </AppLayout>
</template>
