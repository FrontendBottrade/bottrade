<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthBase from '@/layouts/AuthLayout.vue';
import { LoaderCircle } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = reactive({
    email: '',
    password: '',
    remember: false,
    processing: false,
    errors: {},
});
const status = ref('');
const canResetPassword = true;

const submit = () => {
    form.processing = true;
    // Remplace par un appel API réel si besoin
    setTimeout(() => {
        form.processing = false;
        status.value = 'Login non connecté au backend';
        // router.push('/dashboard'); // décommente pour rediriger après login
    }, 1000);
};
</script>

<template>
    <AuthBase title="Log in to your account" description="Enter your email and password below to log in">
        <div v-if="status" class="mb-4 text-center text-sm font-medium text-green-600">
            {{ status }}
        </div>
        <form @submit.prevent="submit" class="flex flex-col gap-6">
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="email">Email address</Label>
                    <Input id="email" type="email" required autofocus :tabindex="1" autocomplete="email" v-model="form.email" placeholder="email@example.com" />
                    <InputError :message="form.errors?.email" />
                </div>
                <div class="grid gap-2">
                    <div class="flex items-center justify-between">
                        <Label for="password">Password</Label>
                        <router-link v-if="canResetPassword" to="/auth/forgotpassword" class="text-sm" :tabindex="5">
                            Forgot password?
                        </router-link>
                    </div>
                    <Input id="password" type="password" required :tabindex="2" autocomplete="current-password" v-model="form.password" placeholder="Password" />
                    <InputError :message="form.errors?.password" />
                </div>
                <div class="flex items-center justify-between" :tabindex="3">
                    <Label for="remember" class="flex items-center space-x-3">
                        <Checkbox id="remember" v-model="form.remember" :tabindex="4" />
                        <span>Remember me</span>
                    </Label>
                </div>
                <Button type="submit" class="mt-4 w-full" :tabindex="4" :disabled="form.processing">
                    <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
                    Log in
                </Button>
            </div>
            <div class="text-center text-sm text-muted-foreground">
                Don't have an account?
                <router-link to="/auth/register" :tabindex="5">Sign up</router-link>
            </div>
        </form>
    </AuthBase>
</template>
