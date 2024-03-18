<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { computed } from 'vue';

const defaultLayout = "empty"

const { currentRoute } = useRouter()

const layout = computed(() => `${currentRoute.value.meta.layout || defaultLayout}-layout`)
</script>

<template>
  <div class="grid grid-flow-col relative">
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>