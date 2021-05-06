<template>
  <div class="container info">
    <book :id="$route.params.id" :type="'page'"></book>
  </div>
</template>

<script>
import Book from './Book.vue';
export default {
  components: { Book }
}
</script>
