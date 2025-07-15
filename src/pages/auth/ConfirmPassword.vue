<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { LoaderCircle } from 'lucide-vue-next';
import { reactive, ref } from 'vue';

const form = reactive({
    password: '',
    processing: false,
    errors: {},
});
const status = ref('');

const submit = () => {
    form.processing = true;
    setTimeout(() => {
        form.processing = false;
        status.value = 'Mot de passe confirmé (démo)';
    }, 1000);
};
</script>

<template>
    <AuthLayout title="Confirm your password" description="This is a secure area of the application. Please confirm your password before continuing.">
        <div v-if="status" class="mb-4 text-center text-sm font-medium text-green-600">
            {{ status }}
        </div>
        <form @submit.prevent="submit">
            <div class="space-y-6">
                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" class="mt-1 block w-full" v-model="form.password" required autocomplete="current-password" autofocus />
                    <InputError :message="form.errors?.password" />
                </div>
                <div class="flex items-center">
                    <Button class="w-full" :disabled="form.processing">
                        <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
                        Confirm Password
                    </Button>
                </div>
            </div>
        </form>
    </AuthLayout>
</template>
