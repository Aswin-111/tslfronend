import { createRouter, createWebHistory } from "vue-router"; // Import necessary Vue Router functions


import RegUser from "./views/RegUser.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/reg",
      component: RegUser,
    }
  ],
});

export default router;
