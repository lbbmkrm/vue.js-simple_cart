<template>
  <div class="max-w-6xl mx-auto px-4 min-h-screen">
    <!-- Desktop -->
    <div class="hidden md:block">
      <div class="flex mt-4 gap-8">
        <div class="">
          <div class="flex flex-col h-full justify-center">
            <h2 class="text-3xl font-bold leading-tight">
              <strong>Delicious Food Menu,</strong>
              <br />in Your Gadget
            </h2>
            <p class="mt-4 text-lg">
              Ayo segera pilih dan pesan makanan favorit Anda
            </p>
            <router-link
              class="mt-4 px-6 text-center py-3 text-lg text-white bg-green-600 rounded-md hover:bg-green-700"
              to="/product"
            >
              Pesan
            </router-link>
          </div>
        </div>
        <div class="">
          <img
            src="../assets/img/hero.png"
            alt="Hero Image"
            class="w-full h-auto"
          />
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="block md:hidden">
      <div class="flex flex-wrap mt-4">
        <div class="w-full mb-4">
          <img
            src="../assets/img/hero.png"
            alt="Hero Image"
            class="w-full h-auto"
          />
        </div>
        <div class="w-full">
          <div class="flex flex-col items-center text-center">
            <h2 class="text-2xl font-bold leading-tight">
              <strong>Delicious Food Menu,</strong>
              <br />in Your Gadget
            </h2>
            <p class="mt-4 text-lg">
              Ayo segera pilih dan pesan makanan favorit Anda
            </p>
            <button
              class="inline-block text-center mt-4 px-6 py-3 text-lg text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Pesan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
