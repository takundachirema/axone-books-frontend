<template>
  <li class="books-item">
    <a class="books-item__link" :class="{'no-image': noImage}" :href="'/book/' + book.id" @click.prevent="openBookPopup(true)">
      <figure class="books-item__poster">
        <img v-if="!noImage" class="books-item__img" src="../assets/images/placeholder.png" v-img="poster()" alt="">
        <img v-if="noImage" class="books-item__img is-loaded" src="../assets/images/book_cover.jpg" alt="">
      </figure>
      <div class="books-item__content book__title-text">
        <span>
          <div  v-formatChapter="book.version"></div>
          <span v-if="!book.metadata.chapter_title" class="books-item__title">New Untitled Chapter</span>
          {{ book.metadata.chapter_title }}
        </span>
      </div>
    </a>
  </li>
</template>

<script>
import img from '../directives/v-image.js'
import formatChapter from '../directives/v-formatChapter.js'

export default {
  props: ['pk','book'],
  directives: {
    img: img,
    formatChapter: formatChapter
  },
  data(){
    return{
      noImage: false
    }
  },
  mounted(){
    //console.log("book item "+JSON.stringify(this.book))
  },
  methods: {
    poster() {
      if(this.book.metadata.cover){
        return process.env.VUE_APP_IPFS_GATEWAY + this.book.metadata.cover;
      } else {
        this.noImage = true;
      }
    },
    openBookPopup(event){
      eventHub.$emit('openBookPopup', this.book, this.pk, event);
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/css/variables';
  @import '../assets/css/media-queries';
  @import '../assets/css/app';
  @import '../assets/css/books';
</style>
