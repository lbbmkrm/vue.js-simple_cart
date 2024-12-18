<template>
  <div class="pesanan-sukses">
    <div class="container mx-auto px-4">
      <div class="flex justify-center mt-12">
        <div class="text-center">
          <img src="../assets/img/menunggu.png" width="300" />
          <h2 class="text-2xl font-bold mt-4">Sukses!!</h2>
          <h4 class="text-lg mt-2">
            Pesanan Anda segera diproses <br />Selamat Menunggu
          </h4>
          <button
            v-on:click="goToHome"
            class="mt-6 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goToHome = () => {
  router.push({ path: "/" });
};
</script>

<style></style>
