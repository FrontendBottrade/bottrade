<script setup lang="ts">
import { ref, reactive } from 'vue';
import InputError from './InputError.vue';
import { Button } from './ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

const passwordInput = ref<HTMLInputElement | null>(null);
const form = reactive<{
  password: string;
  processing: boolean;
  errors: Record<string, string>;
}>({
  password: '',
  processing: false,
  errors: {},
});

const deleteUser = (e: Event) => {
    e.preventDefault();
    form.processing = true;
    setTimeout(() => {
        form.processing = false;
        // Simule la suppression
        alert('Compte supprimé (démo)');
    }, 1000);
};

const closeModal = () => {
    form.errors = {};
    form.password = '';
};
</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button variant="destructive">Delete Account</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete your account? This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <form @submit.prevent="deleteUser">
                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" v-model="form.password" ref="passwordInput" required />
                    <InputError :message="form.errors?.password" />
                </div>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button type="button" variant="secondary" @click="closeModal">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" variant="destructive" :disabled="form.processing">
                        Delete
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
