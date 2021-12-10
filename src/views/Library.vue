<template>
    <div id="app">
        <books-list
            :type="'component'" 
            :mode="'collection'" 
            :category="'popular'" 
            :shortList="true"
            :page="'library'"
            :pageTitle="'Latest Books'"
            :searchQuery="searchQuery">
        </books-list>
    </div>
</template>

<script>
import BooksList from '../components/BooksList.vue'

export default {
    props: ['searchQuery'],
    components: { BooksList },
    created(){
        eventHub.$emit('showHeader', true);
        document.title = 'Books';
    },
    watch: { 
        search: function(newVal, oldVal) {
            this.searchQuery=newVal;
        }
    },
    data(){
        return {
            searchQuery: '',
            show_header: true
        }
    }
}
</script>