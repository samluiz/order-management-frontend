<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { RouterLink } from 'vue-router'

const authStore = useAuthStore();
</script>

<template>
    <aside v-if="authStore.user" class="absolute border-r-2 border-gray-300 left-0 w-44 h-screen">
        <nav class="grid place-items-center p-4">
            <div class="grid place-items-start gap-2 text-lg">
            <RouterLink to="/dashboard">Dashboard</RouterLink>
            <RouterLink to="/dashboard/produtos">Produtos</RouterLink>
            <RouterLink to="/dashboard/pedidos">Pedidos</RouterLink>
            </div>
        </nav>
    </aside>
    <slot></slot>
</template>