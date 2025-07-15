<script setup lang="ts">
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { LoaderCircle } from 'lucide-vue-next';
import { reactive, ref } from 'vue';

const form = reactive({
    processing: false,
    errors: {},
});
const status = ref('');

const submit = () => {
    form.processing = true;
    setTimeout(() => {
        form.processing = false;
        status.value = 'Lien de vérification envoyé (démo)';
    }, 1000);
};
</script>

<template>
    <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
        <div v-if="status === 'verification-link-sent'" class="mb-4 text-center text-sm font-medium text-green-600">
            A new verification link has been sent to the email address you provided during registration.
        </div>
        <form @submit.prevent="submit" class="space-y-6 text-center">
            <Button :disabled="form.processing" variant="secondary">
                <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
                Resend verification email
            </Button>
            <router-link to="/auth/login" class="mx-auto block text-sm">Log out</router-link>
        </form>
    </AuthLayout>
</template>
