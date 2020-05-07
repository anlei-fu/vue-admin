// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./route";
import iview from "iview";
import { store } from "./store.js";
import "iview/dist/styles/iview.css";

Vue.use(iview);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  iview.LoadingBar.start();
  next();
});

router.afterEach((to, from, next)  => {
  iview.LoadingBar.finish();
  next();
});

// router.afterEach((to, from) => {
//   iview.LoadingBar.finish();
//  });

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
