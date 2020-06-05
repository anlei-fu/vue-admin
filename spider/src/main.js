// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./route";
import iview from "iview";
import { store } from "./store.js";
import "iview/dist/styles/iview.css";

Vue.use(iview);

router.beforeEach((to, from, next) => {
  iview.LoadingBar.start();

  // // check logined
  // if(!store.getters.isLogined&&to.path!="/login"){
   
  //   return;
  // }

  // // has page right
  // if(!store.authorities.includes(to.path)){
  //   return;
  // }

  next();

});

router.afterEach(()  => {
  iview.LoadingBar.finish();
});



new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
