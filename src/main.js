import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/config/font-awesome";
import "@/styles/tailwind.css";

import axios from "@/config/axios";
import VueMask from "v-mask";

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.use(VueMask);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
