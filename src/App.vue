<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="wrapper">
      <header>
        <nav class="">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/products">Products</RouterLink>
          <RouterLink to="/orders">Orders</RouterLink>
        </nav>
      </header>
    </div>
  <RouterView />
</template>