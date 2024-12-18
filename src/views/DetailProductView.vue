<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const product = ref({});
const order = reactive({
  total: null,
  notes: "",
});

const fetchProduct = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/products/${route.params.id}`
    );
    product.value = response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    toast.error("Produk tidak ditemukan", {
      position: "top-right",
      duration: 3000,
    });
  }
};

const pemesanan = async () => {
  if (order.total) {
    try {
      const payload = {
        ...order,
        products: product.value,
      };
      await axios.post("http://localhost:3000/carts", payload);
      toast.success("Sukses Masuk Keranjang", {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
      router.push({ path: "/cart" });
    } catch (error) {
      console.error("Error saat menambahkan ke keranjang:", error);
      toast.error("Gagal menambahkan ke keranjang", {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
    }
  } else {
    toast.error("Jumlah Pesanan Harus diisi", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};

onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <div v-if="product.id" class="food-detail bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto px-4 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            :src="`/assets/img/${product.img}`"
            class="w-full h-auto rounded-lg shadow-md object-cover"
            :alt="product.name"
          />
        </div>

        <div>
          <h2 class="text-2xl font-bold text-gray-800">{{ product.name }}</h2>
          <hr class="my-3 border-t border-gray-300" />
          <h4 class="text-xl text-gray-600">
            Harga:
            <strong class="text-green-600">Rp. {{ product.price }}</strong>
          </h4>

          <form class="mt-6 space-y-4" @submit.prevent="pemesanan">
            <div>
              <label for="total" class="block text-gray-700 font-medium">
                Jumlah Pesan
              </label>
              <input
                type="number"
                v-model.number="order.total"
                id="total"
                min="1"
                required
                class="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label for="notes" class="block text-gray-700 font-medium">
                Keterangan
              </label>
              <textarea
                v-model="order.notes"
                id="notes"
                placeholder="Keterangan seperti: Pedas, Nasi Setengah, dll."
                class="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all"
            >
              Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center min-h-screen">
    <p class="text-gray-500">Loading...</p>
  </div>
</template>
