<template>
    <div id="app">
        <books-list
            :type="'component'" 
            :mode="'collection'" 
            :category="'popular'" 
            :shortList="true"
            :pageTitle="'Latest Books'">
        </books-list>
    </div>
</template>

<script>
import BooksList from '../components/BooksList.vue'

export default {
    components: { BooksList },
    created(){
        document.title = 'Books';
    },
    data(){
        return {
        }
    }
}
</script>