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
    
    <book-popup v-if="bookPopupIsVisible" @close="closeBookPopup" :book="book"></book-popup>

    <header v-show="show_header" class="header">
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
  import storage from './storage.js'
  import BookPopup from './components/BookPopup.vue'

  export default {
    name: 'App',
    components: {BookPopup},
    methods: {
      getData(){ },
      storeBooks(books){
        //alert("store books")
        for (var i=0;i<books.length;i++){
          //alert(books[i].metadata.title);
          localStorage.setItem(books[i].id,JSON.stringify(books[i]))
        }
      },
      openBookPopup(book, newBookPopup){
        if(newBookPopup){
          storage.backTitle = document.title;
        }
        storage.createBookPopup = newBookPopup;
        this.bookPopupIsVisible = true;
        this.book = book;
        document.querySelector('body').classList.add('hidden');
      },
      closeBookPopup(){
        storage.createBookPopup = false;
        this.bookPopupIsVisible = false;
        document.querySelector('body').classList.remove('hidden');
        window.history.back();
      },
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
      },
      // Router After Leave
      afterLeave(){
        document.querySelector('body').scrollTop = 0;
      },
      // Detect if touch device
      isTouchDevice() {
        return 'ontouchstart' in document.documentElement;
      },
      showHeader(show) {
        this.show_header = show;
      }
    },
    mounted () {
      M.AutoInit()
    },
    created () {
      this.collapsed = true;
      window.addEventListener('popstate', this.onHistoryState);
      window.addEventListener('pagehide', this.changeHistoryState);
      eventHub.$on('openBookPopup', this.openBookPopup);
      eventHub.$on('setSearchQuery', this.setSearchQuery);
      eventHub.$on('requestToken', this.requestToken);
      eventHub.$on('setUserStatus', this.setUserStatus);
      eventHub.$on('showHeader', this.showHeader);
      eventHub.$on('storeBooks', this.storeBooks);
      if (this.isTouchDevice()) {
        document.querySelector('body').classList.add('touch');
      }
    },
    data() {
      return {
        bookPopupIsVisible: false,
        bookPopupHistoryVisible: false,
        book: {},
        searchQuery: '',
        loading: true,
        show_header: false,
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
            href: '/read',
            title: 'Read',
            icon: 'fa fa-book-reader'
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