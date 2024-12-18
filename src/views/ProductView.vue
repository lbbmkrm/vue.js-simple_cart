<template>
  <div>
    <div class="max-w-7xl mx-auto px-4">
      <div class="mt-4">
        <div class="text-xl font-semibold">
          Daftar <strong class="font-bold">Makanan</strong>
        </div>
      </div>

      <div class="mt-3">
        <div>
          <div class="relative">
            <input
              v-model="search"
              type="text"
              class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Cari Makanan Kesukaan Anda .."
              aria-label="Cari"
              @keyup="searchFood"
            />

            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <b-icon-search class="text-gray-500"></b-icon-search>
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white p-4 rounded-lg shadow-md"
        >
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CardProduct from "../components/CardProductComponent.vue";
import axios from "axios";

const products = ref([]);
const search = ref("");

const setProducts = (data) => {
  products.value = data;
};

const searchFood = () => {
  console.log(search.value);
  axios
    .get("http://localhost:3000/products?q=" + search.value)
    .then((response) => setProducts(response.data))
    .catch((error) => console.log(error));
};

onMounted(() => {
  axios
    .get("http://localhost:3000/products")
    .then((response) => setProducts(response.data))
    .catch((error) => console.log(error));
});
</script>
