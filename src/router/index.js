import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "@/views/ProductView.vue";
import CartView from "@/views/CartView.vue";
import DetailProductView from "@/views/DetailProductView.vue";
import OrderSuccess from "@/views/OrderSuccess.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/product",
      name: "product",
      component: ProductView,
    },
    {
      path: "/product/:id",
      name: "product.detail",
      component: DetailProductView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/success-order",
      name: "successOrder",
      component: OrderSuccess,
    },
  ],
});

export default router;
