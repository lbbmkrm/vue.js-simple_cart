<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 duration-300"
  >
    <img
      :src="`assets/img/${product.img}`"
      class="w-full h-48 object-cover"
      :alt="product.name"
    />
    <div class="p-4">
      <h5 class="text-lg font-semibold text-gray-800 mb-2">
        {{ product.name }}
      </h5>
      <p class="text-gray-600 mb-3">Harga : Rp. {{ product.price }}</p>
      <router-link
        :to="'/product/' + product.id"
        class="inline-flex items-center justify-center w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
      >
        Pesan
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>
