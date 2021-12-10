import Vue from 'vue'
import App from './App.vue'

import VueSidebarMenu from 'vue-sidebar-menu'
// import the es6 version
import 'zingchart/es6'
import ZingChartVue from 'zingchart-vue'
import ZingGrid from 'zinggrid'
import VueRouter from 'vue-router'
import axios from 'axios'

import About from './views/About.vue'
import Library from './views/Library.vue'
import Publish from './views/Publish.vue'
import Read from './views/Read.vue'
import Explore from './views/Explore.vue'

import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import 'vue-search-select/dist/VueSearchSelect.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/js/zingchart-navpie.min.js';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueTippy, { TippyComponent } from "vue-tippy";
import Notifications from 'vue-notification'
import VueMeta from 'vue-meta'

window.eventHub = new Vue();

Vue.use(VueTippy);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Notifications)
Vue.use(VueMeta)
Vue.use(VueRouter)
Vue.use(VueSidebarMenu)
Vue.component('zinggrid', ZingGrid)
Vue.component('zingchart', ZingChartVue)
Vue.component("tippy", TippyComponent);

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Library',
      component: Library
    },
    {
      path: '/read/:id/:title',
      name: 'Read',
      component: Read
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish
    },
    {
      path: '/explore/:id/:title',
      name: 'Explore',
      component: Explore
    },
    {
      path: '/about',
      name: 'About',
      component: About
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
