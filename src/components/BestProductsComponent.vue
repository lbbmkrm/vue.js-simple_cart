<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import CardProductComponent from "../components/CardProductComponent.vue";

let bestProduct = ref([]);

const setProducts = (data) => (bestProduct.value = data);
onMounted(() => {
  axios
    .get("http://localhost:3000/best-products")
    .then((response) => setProducts(response.data))
    .catch((error) => console.log(error));
});
</script>

<template>
  <div class="best-product min-h-screen">
    <div class="flex justify-between items-center mt-4 mb-4">
      <h2 class="text-2xl font-semibold">
        Best
        <strong class="text-green-600">Foods</strong>
      </h2>
      <router-link
        to="/product"
        class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded inline-flex items-center"
      >
        <span class="w-6 h-6"><i class="bi bi-cart-plus"></i></span> Lihat Semua
      </router-link>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="product in bestProduct" :key="product.id" class="mt-4">
        <CardProductComponent :product="product" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Any additional custom styles can be added here */
</style>
