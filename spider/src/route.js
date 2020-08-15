import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/login'
import home from '@/components/page/home'
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
        path: 'site',
        name: 'site',
        component:()=> import("@/components/page/site/index"),
      }, {
        path: 'downSystem',
        name: 'downSystem',
        component:()=> import("@/components/page/downSystem/index"),
      }, {
        path: 'downSystemSite',
        name: 'downSystemSite',
        component:()=> import("@/components/page/downSystemSite/index"),
      }, {
        path: 'siteAccount',
        name: 'siteAccount',
        component:()=> import("@/components/page/siteAccount/index"),
      }, {
        path: 'cookie',
        name: 'cookie',
        component:()=> import("@/components/page/cookie/index"),
      }, {
        path: 'proxy',
        name: 'proxy',
        component:()=> import("@/components/page/proxy/index"),
      }, {
        path: 'crawler',
        name: 'crawler',
        component:()=> import("@/components/page/crawler/index"),
      },{
        path: 'task',
        name: 'task',
        component:()=> import("@/components/page/crawlTask/index"),
      }, {
        path: 'siteIpBlockMap',
        name: 'siteIpBlockMap',
        component:()=> import("@/components/page/siteIpBlockMap/index"),
      }, {
        path: 'siteIpDelayMap',
        name: 'siteIpDelayMap',
        component:()=> import("@/components/page/siteIpDelayMap/index"),
      },{
        path: 'dictionary',
        name: 'dictionary',
        component:()=> import("@/components/page/dictionary/index"),
      },
      ]

    }
  ]
})
