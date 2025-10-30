import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./app.vue";
import router from "./router";
import { useUserStore } from "@/stores/user.store";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
// hydrate persisted user selection before mount
useUserStore().hydrate();
app.mount("#app");
