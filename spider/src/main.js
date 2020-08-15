// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import iview from "iview";
import { store } from "./store.js";
import "iview/dist/styles/iview.css";
import myControl from "./components/control/index"
import router from "./route";
import utils from "./utils";
import ruleFactory from "./validateUtils"
import  api from "./api"
import { format } from "./formatter";
import { Enums } from "./Enums";
import {ToString} from "./DateUtil"
// import { config } from "./configs/config";
// import { Formatter } from "./libs/Formatter";
// import { ApiClientFactory } from "./libs/ApiClientFactory";

// components
Vue.use(iview);
Vue.use(myControl);

// extends Vue
Vue.prototype.Enums = new Enums();

// global filter
// const formater = new Formatter();
// formater.useFormatter(config.formater);
Vue.filter("formatter", (value, config) => {
  return format(value, config);
});

//---------- extends Vue-------------------------------
//api
// Vue.api = Vue.prototype.api = ApiClientFactory.create(config.apis);
utils.formatDate=val=>ToString(val);
Vue.$utils = Vue.prototype.$utils = utils;
Vue.$ruleFactory = Vue.prototype.$ruleFactory = ruleFactory;
Vue.$api = Vue.prototype.$api = api;



// router config
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

router.afterEach(() => {
  iview.LoadingBar.finish();
});




new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
