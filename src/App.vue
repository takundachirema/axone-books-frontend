<template>
  <div id="app">
    <sidebar-menu
      :menu="menu"
      :show-one-child="true"
      :collapsed="true"
      @item-click="onItemClick">
      <div slot="header" class="top-menu-item">
        <img src="./assets/images/bookshelf.png">
      </div>
    </sidebar-menu>
    <router-view :data="getData()"/>
    
    <header class="header">
      <div class="header__search row">
        <div class="input-field col s1">
          <i class="material-icons prefix">search</i>
          <input id="icon_prefix header__search-input" type="text" @keyup.enter="search">
          <label for="icon_prefix">search for book...</label>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  import M from 'materialize-css'

  export default {
    name: 'App',
    methods: {
      getData(){ },
      onToggleCollapse (collapsed) {
        this.collapsed = collapsed
      },
      onItemClick (event, item) {
        console.log('onItemClick')
        console.log(event)
        console.log(item)
      },
      filter: function() {
        console.log("add name")
      }
    },
    mounted () {
      M.AutoInit()
    },
    created () {
      this.collapsed = true
    },
    data() {
      return {
        loading: true,
        menu: [
          {
            header: true,
            title: 'Axone Books',
            hiddenOnCollapse: true
          },
          {
            href: '/',
            title: 'Library',
            icon: 'fa fa-book'
          },
          {
            href: '/publish',
            title: 'Publish',
            icon: 'fa fa-globe'
          },
          {
            href: '/about',
            title: 'About',
            icon: 'fa fa-info-circle'
          },
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import './assets/css/variables';
  @import './assets/css/media-queries';
  @import './assets/css/app';
  @import './assets/css/templatemo-style';
</style>