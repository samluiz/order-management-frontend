<script setup lang="ts">
import { getPedidos } from '@/services/pedido.api';
import { useAuthStore } from '@/stores/auth.store';
import type { Pedido } from '@/types/pedido';
import { onMounted, ref } from 'vue';

const pedidos = ref<Pedido[]>([]);

async function fetchPedidos() {
  const response = await getPedidos()
  pedidos.value = response.data
}

onMounted(() => {
  fetchPedidos()
})

const authStore = useAuthStore();
</script>

<template>
  <main class="w-[calc(100%-11rem)] min-h-screen grid place-items-center absolute right-0">
      <div class="h-full p-8 w-full">
        <div class="w-full grid place-items-start">
          <h1 v-if="authStore.user?.username" class="text-2xl">Welcome, {{ authStore.user?.username }}</h1>
        </div>
        
        <div class="w-full mt-32 grid place-items-center">
          <h2 class="text-xl">Últimos pedidos</h2>
          <ul>
            <li v-for="pedido in pedidos" :key="pedido.id" class="border-b-2 border-gray-300 w-full p-4">
              <ul>
                <li v-for="item in pedido.itens" :key="item.id">
                  <p class="text-lg">Produto: {{ item.produto.nome }}</p>
                  <p class="text-lg">Quantidade: {{ item.quantidade }}</p>
                </li>
              </ul>
              <p class="text-lg">Valor: R$ {{ pedido.total }}</p>
            </li>
          </ul>
        </div>

      </div>
  </main>
</template>
