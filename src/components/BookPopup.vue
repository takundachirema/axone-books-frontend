<template>
  <div class="book-popup" @click="$emit('close')">
    <div class="book-popup__box" @click.stop>
      <book 
        :book="book" 
        :pk="pk"
        :node="node">
      </book>
      <button class="book-popup__close" @click="$emit('close')"></button>
    </div>
  </div>
</template>

<script>
import Book from './Book.vue';

export default {
  props: ['pk','book', 'node'],
  components: { Book },
  created(){
    window.addEventListener('keyup', function(e){
      if (e.keyCode == 27) {
        this.$emit('close');
      }
    }.bind(this));
  }
}
</script>

<style lang="scss">
  @import '../assets/css/variables';
  @import '../assets/css/media-queries';
  @import '../assets/css/app';
  @import '../assets/css/books';
</style>
