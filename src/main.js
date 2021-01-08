import Vue from "vue";

// UI
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";

// import "element-ui/lib/theme-chalk/index.css";
import "@/assets/scss/element-variables.scss";
import "@/assets/css/common.css";
import "@/fontAwesomeIcon.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
