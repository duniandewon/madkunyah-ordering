import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/screens/Home.vue"),
    },
    {
      path: "/menu/:id",
      component: () => import("@/screens/MenuDetail.vue"),
    },
    {
      path: "/cart",
      component: () => import("@/screens/Cart.vue"),
    },
    {
      path: "/payment/:id",
      component: () => import("@/screens/Payment.vue"),
    },
  ],
});

export default router;
