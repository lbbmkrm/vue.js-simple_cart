import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toast-notification";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/main.css";
import "vue-toast-notification/dist/theme-sugar.css";

const app = createApp(App);

app.use(router);
app.use(Toast);
app.mount("#app");
