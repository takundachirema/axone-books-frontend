import Vue from 'vue'
import App from './App.vue'

import VueSidebarMenu from 'vue-sidebar-menu'
import VueRouter from 'vue-router'
import axios from 'axios'

import About from './views/About.vue'
import Privacy from './views/Privacy.vue'
import Service from './views/Service.vue'
import Tutorial from './views/Tutorial.vue'
import Information from './views/Information.vue'
import Library from './views/Library.vue'
import Publish from './views/Publish.vue'
import Read from './views/Read.vue'
import Explore from './views/Explore.vue'
import Tokenize from './views/Tokenize.vue'

import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import 'vue-search-select/dist/VueSearchSelect.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import VueTippy, { TippyComponent } from "vue-tippy";
import Notifications from 'vue-notification'
import VueMeta from 'vue-meta'

window.eventHub = new Vue();

Vue.use(VueTippy);
Vue.use(Notifications)
Vue.use(VueMeta)
Vue.use(VueRouter)
Vue.use(VueSidebarMenu)
Vue.component("tippy", TippyComponent);

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: About
    },
    {
      path: '/library',
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
      path: '/tokenize/:id/:title',
      name: 'Tokenize',
      component: Tokenize
    },
    {
      path: '/info',
      name: 'Info',
      component: Information
    },
    {
      path: '/tutorial',
      name: 'Tutorial',
      component: Tutorial
    },
    {
      path: '/privacy',
      name: 'Privacy Policy',
      component: Privacy
    },
    {
      path: '/service',
      name: 'Service Agreement',
      component: Service
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
