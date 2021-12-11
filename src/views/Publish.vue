<template>
    <div id="app">
        <books-list
            :type="'component'" 
            :mode="'collection'" 
            :category="'published'" 
            :shortList="true"
            :page="'publish'"
            :key="public_key"
            :pk="public_key"
            :pageTitle="'Published Books'"
            :searchQuery="searchQuery">
        </books-list>
        
        <div id="publish-modal9" class="modal">
            <div class="modal-content">
                <h4>Modal Header</h4>
                <p>A bunch of text</p>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
        </div>

        <div id="search-modal" class="modal modal__medium">
            <div class="modal-content">
                <h4>Get Published</h4>
                <div class="row">
                    <form id="search-form" class="col s12">
                        <div class="row small-margin">
                            <div class="input-field col s12">
                                <blockquote>
                                    Please enter the public or private key of the documents 
                                    you wish to retrieve. For more information click 
                                    <a href="./info/#keys" target="_blank">here</a>.
                                </blockquote>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <span id="generate-key-pair" class="prefix clickable">
                                <i class="material-icons prefix tooltipped" data-position="bottom" data-tooltip="generate">public</i>
                                </span>
                                <input 
                                id="public_key-text-area"
                                required="" 
                                aria-required="true" 
                                type="text"
                                :value="public_key" >
                                <label class="active" for="public_key-text-area">Public or Private Key</label>
                            </div>
                        </div>
                        <div class="h50px w100">
                            <button type="button" id="cancel-search" class="modal-close btn waves-effect waves-light right margined-sides">Cancel</button>
                            <button id="submit-search" class="btn waves-effect waves-light right margined-sides" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>

        <div class="fixed-action-btn">
            <a class="btn-floating btn-large green">
                <i class="large material-icons">mode_edit</i>
            </a>
            <ul>
                <li>
                    <a id="search-button" class="btn-floating red modal-trigger" href="#search-modal" >
                        <i class="material-icons">search</i>
                    </a>
                </li>
                <li>
                    <a id="publish-button" class="btn-floating blue" href="#">
                        <i class="material-icons">add</i>
                    </a>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
import BooksList from '../components/BooksList.vue'
import $ from 'jquery'
import Base58 from 'base-58';

var self;

export default {
    props: ['searchQuery'],
    components: { BooksList },
    data(){
        return {
            searchQuery: '',
            show_header: true,
            public_key: ''
        }
    },
    methods: {
        populatePublicKey(){
            var key = $("#public_key-text-area").val();
            var decoded = Base58.decode(key);
            var publicKey = key;

            if (decoded.length === 64){
                publicKey = Base58.encode(decoded.slice(32));
            }else if (decoded.length !== 32){
                alert("Please enter a valid key");
                return false;
            }

            // store into local storage
            localStorage.setItem("public_key", publicKey);
            
            this.public_key = '';
            this.public_key = publicKey;
            
            return true;
        },
        registerEvents(){
            $('#publish-button').bind('click', function(e) {       
                self.openBookPopup(true);      
            });

            $("#search-form").submit(function () {
                var reload = self.populatePublicKey();
                return false;
            });
        },
        UISetup(){
            var elems = document.querySelectorAll('.fixed-action-btn');
            M.FloatingActionButton.init(elems, {
                direction: 'up'
            });

            elems = document.querySelectorAll('.tooltipped');
            M.Tooltip.init(elems, {});

            elems = document.querySelectorAll('.modal');
            M.Modal.init(elems, {
                preventScrolling: false
            });
        },
        openBookPopup(event){
            eventHub.$emit('openBookPopup', null, event);
        }
    },
    mounted(){
        this.UISetup();
        this.registerEvents();
        this.public_key = localStorage.getItem('public_key');
    },
    created(){
        self = this;
        eventHub.$emit('showHeader', true);
        document.title = 'Books';
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