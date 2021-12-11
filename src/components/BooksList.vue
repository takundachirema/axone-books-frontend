<template>
  <div class="wrapper" v-if="listLoaded">
    <div class="books" v-if="books.length">
      <header class="books__header">
        <h2 class="books__title">{{ listTitle }}</h2>
        <span class="books__results" v-if="!shortList">{{ countResults }}</span>
        <router-link v-if="shortList" class="books__link" :to="{name: 'home-category', params: {category: category}}">
          View All
        </router-link>
      </header>
      <ul class="books__list">
        <books-list-item 
          class="books__item" 
          v-for="(book) in books" 
          :book="book"
          :key="book.id"
          :pk="pk">
        </books-list-item>
      </ul>
      <div class="books__nav" v-if="!shortList" :class="{'is-hidden' : currentPage == pages}">
        <button @click="loadMore" class="button">Load More</button>
      </div>
    </div>
    <i v-if="!listLoaded" class="loader"></i>
    <section v-if="!books.length" class="not-found">
      <div class="not-found__content">
        <h2 class="not-found__title" v-if="mode == 'search'">Nothing Found</h2>
        <h2 class="not-found__title" v-if="mode == 'favorite'">You haven't added any favorite books</h2>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import numeral from 'numeral'
import storage from '../storage.js'
import BooksListItem from './BooksListItem.vue'

const assert = require('assert');

// Storage for removed favorite item
let removed;

export default {
  props: ['pk','page','pageTitle','type', 'mode', 'category', 'shortList','searchQuery'],
  components: { BooksListItem },
  beforeRouteLeave (to, from, next) {
    if(from.name == 'search'){
      eventHub.$emit('setSearchQuery', true);
    }
    next();
  },
  data() {
    return {
      listTitle: '',
      books: [],
      pages: '',
      results: '',
      currentPage: 1,
      listLoaded: false
    }
  },
  computed: {
    query(){
      return this.$route.params.query || '';
    },
    request(){
      if(this.mode == 'search'){
        return `https://api.thebookdb.org/3/search/book?api_key=${storage.apiKey}&language=en-US&query=${this.query}&page=${this.currentPage}`;
      } else if(this.mode == 'collection') {
        let caregory = this.$route.params.category || this.category;
        return `https://api.thebookdb.org/3/book/${caregory}?api_key=${storage.apiKey}&language=en-US&page=${this.currentPage}`;
      } else if(this.mode == 'favorite') {
        return `https://api.thebookdb.org/3/account/${storage.userId}/favorite/books?api_key=${storage.apiKey}&session_id=${storage.sessionId}&language=en-US&sort_by=created_at.desc&page=${this.currentPage}`;
      }
    },
    countResults(){
      if(this.results > 1){
        return numeral(this.results).format('0,0') + ' results';
      } else {
        return numeral(this.results).format('0,0') + ' result';
      }
    }
  },
  methods: {
    getBooks(url, parameters = {}){
      
      parameters["mongodb_url"] = process.env.VUE_APP_BIGCHAINDB_MONGO_DB;

      axios.post(
        url,
        parameters
      )
      .then(resp => {
          let data = resp.data;
          eventHub.$emit('storeBooks', data.results);
          if (this.shortList) {
            this.books = data.results.slice(0, 10);
            this.pages = 1;
            this.results = 10;
          } else {
            this.books = data.results;
            this.pages = data.total_pages;
            this.results = data.total_results;
          }
          this.listLoaded = true;
          if(this.type == 'page'){
            document.title = this.pageTitle;
          }
          console.log(resp.data.results) 
      })
      .catch(e => {
          console.log(e)
      })
    },
    fetchCategory(){
      axios.get(this.request)
      .then(function(resp) {
          let data = resp.data;
          if(this.shortList){
            this.books = data.results.slice(0, 5);
            this.pages = 1;
            this.results = 10;
          } else {
            this.books = data.results;
            this.pages = data.total_pages;
            this.results = data.total_results;
          }
          this.listLoaded = true;
          // Change Page title
          if(this.type == 'page'){
            document.title = this.pageTitle;
          }
      }.bind(this))
      .catch(function(error) {
        this.$router.push({ name: '404' });
      }.bind(this));
    },
    searchBooks(searchQuery){
      if (this.page === "library"){
        this.getBooks('documents/search', {"search_text":searchQuery});
      }else if (this.page === "publish") {
        if (this.pk){
          this.getBooks('documents/search',{"search_text":searchQuery, "public_key":this.pk});
        }
      }
    },
    loadBooks(){
      if (this.page === "library"){
        this.getBooks('documents/latest');
      }else if (this.page === "publish") {
        if (this.pk){
          this.getBooks('documents/public_key',{"public_key":this.pk});
        }
      }
    }
  },
  watch: {
    searchQuery(searchQuery){
      //alert("search:"+searchQuery+"*")
      if (searchQuery){
        this.searchBooks(searchQuery)
      }else{
        this.loadBooks()
      }
    }
  },
  created(){
    this.loadBooks()
  }
}
</script>

<style lang="scss">
  @import '../assets/css/variables';
  @import '../assets/css/media-queries';
  @import '../assets/css/app';
  @import '../assets/css/templatemo-style';
  @import '../assets/css/books';
</style>
