import Vue from "vue";

import "./design/app.scss";
import "./config";
import App from "./App";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

store.dispatch("Logout");

Vue.config.productionTip = false;

window.vm = new Vue({
  router,
  store,
  i18n,
  wait: window.wait,
  render: (h) => h(App),
}).$mount("#app");
