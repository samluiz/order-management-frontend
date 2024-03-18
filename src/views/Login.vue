<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';

const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const err = ref('');

const login = async () => {
    await authStore.login(username.value, password.value)
    .then(() => {
        router.push({ name: 'dashboard' });
    })
    .catch((error) => {
        err.value = error
        console.log(error);
    });
};
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="w-full max-w-md">
            <form class="px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter your username">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password">
                </div>
                <div class="flex items-center justify-between">
                    <button @click.prevent="login" class="text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign In
                    </button>
                    <a class="inline-block align-baseline text-sm text-black" href="#">
                        Forgot Password?
                    </a>
                </div>
                <div class="text-red-500 text-sm text-center italic mt-4" v-if="err">{{ err }}</div>
            </form>
        </div>
    </div>
</template>