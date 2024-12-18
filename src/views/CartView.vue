<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import axios from "axios";

const router = useRouter();
const toast = useToast();

const carts = ref([]);
const order = reactive({
  name: "",
  table: "",
});

const fetchCarts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/carts");
    carts.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteCart = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/carts/${id}`);
    await fetchCarts();
    toast.error("Sukses Hapus Keranjang", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  } catch (error) {
    console.error(error);
  }
};

const checkout = async () => {
  if (order.name && order.table) {
    order.carts = carts.value;
    try {
      await axios.post("http://localhost:3000/orders", order);

      await Promise.all(
        carts.value.map((item) =>
          axios.delete(`http://localhost:3000/carts/${item.id}`)
        )
      );

      router.push({ path: "/success-order" });
      toast.success("Sukses Dipesan", {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    toast.error("Nama dan Nomor Meja Harus diisi", {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};

const totalHarga = computed(() =>
  carts.value.reduce(
    (total, item) =>
      total +
      (item.product ? item.product.price : item.products.price) *
        (item.quantity || item.total),
    0
  )
);

onMounted(() => {
  fetchCarts();
});
</script>

<template>
  <div class="carts">
    <div class="container mx-auto px-4">
      <div class="mt-6">
        <div class="w-full">
          <h2 class="text-2xl font-semibold">
            Keranjang <strong>Saya</strong>
          </h2>
          <div class="mt-3 overflow-x-auto">
            <table class="min-w-full table-auto">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-2 border">#</th>
                  <th class="px-4 py-2 border">Foto</th>
                  <th class="px-4 py-2 border">Makanan</th>
                  <th class="px-4 py-2 border">Keterangan</th>
                  <th class="px-4 py-2 border">Jumlah</th>
                  <th class="px-4 py-2 border">Harga</th>
                  <th class="px-4 py-2 border">Total Harga</th>
                  <th class="px-4 py-2 border">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cart, index) in carts" :key="cart.id">
                  <td class="px-4 py-2">{{ index + 1 }}</td>
                  <td class="px-4 py-2">
                    <img
                      :src="
                        '/assets/img/' +
                        (cart.product ? cart.product.img : cart.products.img)
                      "
                      class="w-32 h-auto shadow-lg"
                    />
                  </td>
                  <td class="px-4 py-2 font-semibold">
                    {{ cart.product ? cart.product.name : cart.products.name }}
                  </td>
                  <td class="px-4 py-2">{{ cart.notes ? cart.notes : "-" }}</td>
                  <td class="px-4 py-2">{{ cart.quantity || cart.total }}</td>
                  <td class="px-4 py-2 text-right">
                    Rp.
                    {{
                      cart.product ? cart.product.price : cart.products.price
                    }}
                  </td>
                  <td class="px-4 py-2 text-right">
                    <strong>
                      Rp.
                      {{
                        (cart.product
                          ? cart.product.price
                          : cart.products.price) * (cart.quantity || cart.total)
                      }}
                    </strong>
                  </td>
                  <td
                    class="px-4 py-2 text-center text-red-600 cursor-pointer"
                    @click="deleteCart(cart.id)"
                  >
                    <i class="bi bi-trash">hapus</i>
                  </td>
                </tr>

                <tr>
                  <td colspan="6" class="px-4 py-2 text-right font-semibold">
                    Total Harga :
                  </td>
                  <td class="px-4 py-2 text-right font-semibold">
                    Rp. {{ totalHarga }}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Form Checkout -->
      <div class="mt-6 flex justify-end">
        <div class="w-full sm:w-1/2 lg:w-1/3">
          <form @submit.prevent="checkout">
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700"
                >Nama :</label
              >
              <input
                id="name"
                name="name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="order.name"
              />
            </div>
            <div class="mb-4">
              <label for="table" class="block text-sm font-medium text-gray-700"
                >Nomor Meja :</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="order.table"
              />
            </div>

            <button
              type="submit"
              class="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <b-icon-cart></b-icon-cart> Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
