<template>
     <div id="app">
        <div class="row">
            <div class="col-sm-0 col-md-12 col-lg-5 col-xl-5 margined-s">
                <div class="card large">
                    <div class="card-image h-90">
                        <figure class="books-item__poster">
                            <img v-if="bookPosterSrc" class="book__img" src="../assets/images/placeholder.png" v-img="bookPosterSrc">
                            <img v-if="!bookPosterSrc" class="books-item__img is-loaded" src="../assets/images/book_cover.jpg">
                        </figure>
                    </div>
                    <div class="card-content">
                        <span class="address activator grey-text text-darken-4">
                            0x68sj284jka82238jhe928hiys8w62hg
                            <i class="material-icons right clickable">more_vert</i>
                        </span>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">
                            Publish Token
                            <i class="material-icons right">close</i>
                        </span>
                        <vue-select-image
                            :dataImages="dataImages"
                            @onselectimage="onSelectImage">
                        </vue-select-image>
                        <div class="h50px w100 center">
                            <button id="publish" class="btn waves-effect waves-light margined primary" @click.prevent="publishToken()">Publish Token</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-0 col-md-12 col-lg-6 col-xl-6 margined-s">
                <ul class="collapsible expandable">
                    <li class="active">
                        <div class="collapsible-header">
                            <i class="material-icons">book</i>
                            Book ID
                        </div>
                        <div class="collapsible-body">
                            <span>
                                {{book.id}}
                            </span>
                        </div>
                    </li>
                    <li class="active">
                        <div class="collapsible-header">
                            <i class="material-icons">book</i>
                            Book Title
                        </div>
                        <div class="collapsible-body">
                            <span>
                                {{book.metadata.book_title}}
                            </span>
                        </div>
                    </li>
                    <li class="active">
                        <div class="collapsible-header">
                            <i class="material-icons">bookmark</i>
                            Chapter Title
                        </div>
                        <div class="collapsible-body">
                            <span>
                                {{ book.metadata.chapter_title }}
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header">
                            <i class="material-icons">hourglass_full</i>
                            Summary
                        </div>
                        <div class="collapsible-body">
                            <span>
                                {{ book.metadata.summary }}
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header">
                            <i class="material-icons">view_headline</i>
                            Synopsis
                        </div>
                        <div class="collapsible-body">
                            <span>
                                {{ book.metadata.synopsis }}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import BookReader from '../components/BookReader.vue'
import pdf from 'vue-pdf'
import $ from 'jquery'
import formatDate from '../directives/v-formatDate.js'
import formatChapter from '../directives/v-formatChapter.js'
import img from '../directives/v-image.js'
import VueSelectImage from 'vue-select-image'
require('vue-select-image/dist/vue-select-image.css')

var self;
var pageModal;

export default {
    directives: {
        img: img,
        formatDate: formatDate,
        formatChapter: formatChapter
    },
    components: { 
        BookReader,
        pdf,
        VueSelectImage
    },
    methods: {
        registerEvents(){

            $('#page-text-area').keypress(function(e){
                if (e.key === 'Enter') {
                    var number = parseInt($('#page-text-area').val());

                    if (number < 1){
                        self.page = 1;
                    }else if (number > self.numPages){
                        self.page = self.numPages;
                    }else{
                        self.page = number;
                    }

                    pageModal.close();
                }
            });
        },
        UISetup(){
            elems = document.querySelectorAll('.fixed-action-btn');
            M.FloatingActionButton.init(elems, {
                direction: 'up'
            });

            var elems = document.querySelectorAll('.tooltipped');
            M.Tooltip.init(elems, {});

            elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, {
                preventScrolling: false
            });

            elems = document.querySelector('.collapsible.expandable');
            M.Collapsible.init(elems, {
                accordion: false
            });

            pageModal = instances[0];
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
        error: function(err) {
            console.log(err);
        }
    },
    mounted(){
        this.registerEvents();
        this.UISetup();
        this.poster();
        this.backdrop();
    },
    created(){
        self = this;
        this.id = this.$route.params.id;
        this.title = this.$route.params.title;
        this.book = JSON.parse(localStorage.getItem(this.id));
        console.log(this.book)
        document.title = this.title;
        eventHub.$emit('showHeader', false);
        eventHub.$emit('hideMenu', 5, false);
    },
    destroyed(){
        eventHub.$emit('hideMenu', 5, true);
    },
    data(){
        return {
            bookPosterSrc: '',
            bookBackdropSrc: '',
            id: 0,
            title: '',
            book: {},
            src:'',
            rotate: 0,
            book_metadata: {},
            referenced_nodes: {},
            payment_pointers: {},
            payment_pointer: '',
            payment_pk: '',
            dataImages: [
                {
                    id: '1',
                    src: require("../assets/images/algorand_logo.png"),
                    alt: 'Alt Image 1'
                }, 
                {
                    id: '2',
                    src: require("../assets/images/ethereum_logo.jpg"),
                    alt: 'Alt Image 1'
                }, 
                {
                    id: '3',
                    src: require("../assets/images/cardano_logo.png"),
                    alt: 'Alt Image 1'
                },
                {
                    id: '4',
                    src: require("../assets/images/solana_logo.jpg"),
                    alt: 'Alt Image 1'
                }
            ]
        }
    }
}
</script>