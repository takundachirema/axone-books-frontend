<template>
  <li class="books-item">
    <a class="books-item__link" :class="{'no-image': noImage}" :href="'/book/' + book.id" @click.prevent="openBookPopup(book.id, true)">
      <figure class="books-item__poster">
        <img v-if="!noImage" class="books-item__img" src="../assets/images/placeholder.png" v-img="poster()" alt="">
        <img v-if="noImage" class="books-item__img is-loaded" src="../assets/images/no-image.png" alt="">
      </figure>
      <div class="books-item__content">
        <p class="books-item__title">{{ book.title }}</p>
      </div>
    </a>
  </li>
</template>

<script>
import img from '../directives/v-image.js'

export default {
  props: ['book'],
  directives: {
    img: img
  },
  data(){
    return{
      noImage: false
    }
  },
  methods: {
    poster() {
      if(this.book.poster_path){
        return 'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + this.book.poster_path;
      } else {
        this.noImage = true;
      }
    },
    openBookPopup(id, event){
      eventHub.$emit('openBookPopup', id, event);
    }
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
