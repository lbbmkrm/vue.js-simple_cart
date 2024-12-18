<script setup>
import NavbarComponent from "./components/NavbarComponent.vue";
</script>
<template>
  <NavbarComponent />
  <main class="w-[75%] mx-auto min-w-screen">
    <RouterView />
  </main>
</template>
