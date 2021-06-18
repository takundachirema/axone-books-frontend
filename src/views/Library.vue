<template>
    <div id="app">
        <books-list
            :type="'component'" 
            :mode="'collection'" 
            :category="'popular'" 
            :shortList="true"
            :page="'library'"
            :pageTitle="'Latest Books'">
        </books-list>
    </div>
</template>

<script>
import BooksList from '../components/BooksList.vue'

export default {
    components: { BooksList },
    created(){
        eventHub.$emit('showHeader', true);
        document.title = 'Books';
    },
    data(){
        return {
            show_header: true
        }
    }
}
</script>