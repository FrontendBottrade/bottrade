<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { LoaderCircle } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = reactive({
    token: '',
    email: '',
    password: '',
    password_confirmation: '',
    processing: false,
    errors: {},
});
const status = ref('');

const submit = () => {
    form.processing = true;
    setTimeout(() => {
        form.processing = false;
        status.value = 'Mot de passe réinitialisé (démo)';
        // router.push('/auth/login');
    }, 1000);
};
</script>

<template>
    <AuthLayout title="Reset password" description="Please enter your new password below">
        <div v-if="status" class="mb-4 text-center text-sm font-medium text-green-600">
            {{ status }}
        </div>
        <form @submit.prevent="submit">
            <div class="space-y-6">
                <div class="grid gap-2">
                    <Label for="email">Email address</Label>
                    <Input id="email" type="email" v-model="form.email" required autofocus />
                    <InputError :message="form.errors?.email" />
                </div>
                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" v-model="form.password" required />
                    <InputError :message="form.errors?.password" />
                </div>
                <div class="grid gap-2">
                    <Label for="password_confirmation">Confirm password</Label>
                    <Input id="password_confirmation" type="password" v-model="form.password_confirmation" required />
                    <InputError :message="form.errors?.password_confirmation" />
                </div>
                <Button class="w-full" :disabled="form.processing">
                    <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
                    Reset password
                </Button>
            </div>
        </form>
    </AuthLayout>
</template>
