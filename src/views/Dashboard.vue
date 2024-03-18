<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
</script>

<template>
  <main class="w-screen min-h-screen">
    <div class="w-full h-full grid">
      <h1 v-if="authStore.user?.username">Welcome, {{ authStore.user?.username }}</h1>
    </div>
  </main>
</template>
