import Vue from 'vue'
import App from './App.vue'

import VueSidebarMenu from 'vue-sidebar-menu'
// import the es6 version
import 'zingchart/es6'
import ZingChartVue from 'zingchart-vue'
import ZingGrid from 'zinggrid'
import VueRouter from 'vue-router'

import About from './views/About.vue'
import Library from './views/Library.vue'
import Publish from './views/Publish.vue'

import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import 'vue-search-select/dist/VueSearchSelect.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/js/zingchart-navpie.min.js';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

window.eventHub = new Vue();

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(VueSidebarMenu)
Vue.component('zinggrid', ZingGrid)
Vue.component('zingchart', ZingChartVue)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Library',
      component: Library
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish
    }
  ]
})

new Vue({
  router,
  render: h => h(App),
  methods: {
    addName: function() {
      console.log("add name")
    }
  }
}).$mount('#app')
