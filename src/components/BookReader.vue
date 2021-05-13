<template>
  <div class="book-reader">
    <div class="book-reader__box">
      <book :book="book"></book>
      <button class="book-reader__close" @click="$emit('close')"></button>
    </div>
  </div>
</template>

<script>
import Book from './Book.vue';

export default {
  props: ['book'],
  components: { Book },
  created(){
      
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
