// import { createApp } from "vue";
// import App from "./App.vue"; // Your main App component
// import router from "./router"; // Import the router

// createApp(App).use(router).mount("#app");
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client'

// const socket = new  VueSocketIO({
//   debug: true,
//   connection: 'http://89.47.164.122:5000'
// });

const app = createApp(App);
app.use(router);
// app.use(socket);

app.mount('#app');