<template>
  <section class="book">
    <div class="book__container" v-if="bookLoaded">
      <header class="book__header" :class="{'book__header--page': type=='page'}" :style="{ 'background-image': 'url(' + bookBackdropSrc + ')' }">
        <div class="book__wrap book__wrap--header" :class="{'book__wrap--page': type=='page'}">
          <figure class="book__poster">
            <img v-if="bookPosterSrc" class="book__img" src="../assets/images/placeholder.png" v-img="bookPosterSrc">
            <img v-if="!bookPosterSrc" class="books-item__img is-loaded" src="../assets/images/no-image.png">
          </figure>
          <div class="book__title">
            <h1 class="book__title-text">
              {{ book.metadata.book_title }}
              <span v-if="book.metadata.chapter_title">{{ book.metadata.chapter_title }}</span>
            </h1>
          </div>
        </div>
      </header>
      <div class="book__main">
        <div class="book__wrap book__wrap--main" :class="{'book__wrap--page': type=='page'}">
          <div class="book__actions" >
            <button id="read" class="btn waves-effect waves-light" @click.prevent="readBook()">Read</button>
          </div>
          <div class="book__info">
            <div v-if="book.metadata.blurb" class="book__description">
              {{ book.metadata.blurb }}
            </div>
            <div class="book__details">
              <div v-if="book.metadata.genres.length" class="book__details-block">
                <h2 class="book__details-title">
                  Genres
                </h2>
                <div class="book__details-text">
                  {{ nestedDataToString(book.metadata.genres) }}
                </div>
              </div>
              <div v-if="book.metadata.published" class="book__details-block">
                <h2 class="book__details-title">
                  Release Date
                </h2>
                <div class="book__details-text" v-formatDate="book.metadata.published"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import storage from '../storage.js'
import img from '../directives/v-image.js'
import formatDate from '../directives/v-formatDate.js'

export default {
  props: ['book', 'type'],
  directives: {
    img: img,
    formatDate: formatDate
  },
  data(){
    return{
      bookLoaded: false,
      bookPosterSrc: '',
      bookBackdropSrc: '',
      userLoggedIn: storage.sessionId ? true : false,
      favoriteChecked: false,
      favorite: ''
    }
  },
  methods: {
    readBook(){
      let route = this.$router.resolve('/read');
      window.open(route.href+"/"+this.book.id+"/"+this.book.metadata.book_title, '_blank');
    },
    showBook(){
      this.poster();
      this.backdrop();
      if(this.userLoggedIn){
        this.checkIfInFavorites(this.book.id);
      } else {
        this.bookLoaded = true;
      }
      // Push state
      if(storage.createBookPopup){
        storage.bookPath = '/book/' + this.book.id;
        history.pushState({ popup: true }, null, storage.bookPath);
        storage.createBookPopup = false;
      }
      // Change Page title
      document.title = this.book.metadata.book_title;
    },
    poster() {
      if(this.book.metadata.cover){
        this.bookPosterSrc = process.env.VUE_APP_IPFS_GATEWAY + this.book.metadata.cover;
      }
    },
    backdrop(){
      this.bookBackdropSrc = "../assets/images/library.png";
    },
    nestedDataToString(data) {
      data = JSON.parse(data);
      let nestedArray = [], resultString;
      data.forEach((item) => nestedArray.push(item));
      resultString = nestedArray.join(', ');
      return resultString;
    },
    checkIfInFavorites(id){
      axios.get(`https://api.thebookdb.org/3/book/${id}/account_states?api_key=${storage.apiKey}&session_id=${storage.sessionId}`)
      .then(function(resp){
          this.favorite = resp.data.favorite;
          this.favoriteChecked = true;
          this.bookLoaded = true;
      }.bind(this))
    },
    toggleFavorite(){
      let favoriteInvert = !this.favorite;
      this.favorite = '';
      axios.post(`https://api.thebookdb.org/3/account/${storage.userId}/favorite?api_key=${storage.apiKey}&session_id=${storage.sessionId}`, {
        'media_type': 'book',
        'media_id': this.id,
        'favorite': favoriteInvert
      })
      .then(function(resp){
        this.favorite = favoriteInvert;
        eventHub.$emit('updateFavorite');
      }.bind(this));
    }
  },
  watch: {
    id: function(val){
      this.fetchBook(val);
    }
  },
  created(){
    this.showBook();
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
