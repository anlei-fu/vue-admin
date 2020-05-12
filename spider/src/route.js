import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/login'
import home from '@/components/page/home'
import log from '@/components/page/log'
import log2 from '@/components/page/log2'
import changePassword from '@/components/page/changePassword'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/login',
      name: 'login',
      component: login
    }
    ,
    {
      path: '/',
      name: 'home',
      component: home,
      children: [{
        path: 'log',
        name: 'log',
        component: log,
      }, {
        path: 'changePassword',
        name: 'changePassword',
        component: changePassword,
      }, {
        path: 'log2',
        name: 'log2',
        component: log2,
      }]

    }
  ]
})
