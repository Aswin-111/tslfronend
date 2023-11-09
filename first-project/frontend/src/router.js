import { createRouter, createWebHistory } from "vue-router"; // Import necessary Vue Router functions

import RegUser from "./views/RegUser.vue";
import SelectOption from './views/SelectOption.vue'
import SocketConnect from './views/SocketConnect.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/reg",
      component: RegUser,
    },
    {
      path: "/select",
      component: SelectOption,
    },

    {
      path: "/socket",
      component: SocketConnect,
    },
  ],
});

export default router;
