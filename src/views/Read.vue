<template>
    <div class="pager-container">
        <!--<input v-model.number="page" type="number" style="width: 5em"> /{{numPages}} -->
        <div class="pager">
            <div id="nav-left" class="nav-left"></div>
            <pdf
                ref="pdf" 
                style="width: 100%;"
                :src="src" 
                :page="page"
                @password="password" 
                @progress="loadedRatio = $event" 
                @error="error" 
                @num-pages="numPages = $event" 
                @link-clicked="page = $event">
            </pdf>
            <div id="nav-right" class="nav-right"></div>
        </div>

        <div id="page-modal" class="modal modal__small">
            <div class="modal-content">
                <div class="row">
                    <div id="page-form" class="col s12">
                        <div class="row small-margin">
                            <div class="input-field col s12">
                                <blockquote>
                    Enter the page number and press return
                                </blockquote>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <span id="generate-key-pair" class="prefix">
                                    <i class="material-icons prefix">pages</i>
                                </span>
                                <input
                                    id="page-text-area"
                                    type="number"
                                    min="1" 
                                    :max="numPages"
                                    :value="page">
                                <label for="page-text-area" class="active">Book Page</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

         <div id="monetize-modal" class="modal">
            <div class="modal-content">
                <div class="row">
                    <form id="search-form" class="col s12">
                        <div class="row small-margin">
                            <div class="input-field col s12">
                                <blockquote>
                    Web Monetization State. For more information click here.
                                </blockquote>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <span id="generate-key-pair" class="prefix clickable">
                                <i class="material-icons prefix tooltipped" data-position="bottom" data-tooltip="generate">network_check</i>
                                </span>
                                <input 
                                id="state-text-area"
                                disabled
                                :class="getMonetizationState()"
                                type="text"
                                :value="getMonetizationState()" >
                            </div>
                        </div>

                        <div class="row small-margin">
                            <div class="input-field col s12">
                                <blockquote>
                    Payment Pointer. For more information click here.
                                </blockquote>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <span id="generate-key-pair" class="prefix clickable">
                                <i class="material-icons prefix tooltipped" data-position="bottom" data-tooltip="generate">monetization_on</i>
                                </span>
                                <input 
                                id="pointer-text-area"
                                disabled
                                type="text"
                                :value="payment_pointer" >
                            </div>
                        </div>
                        <div class="h50px w100">
                            <button type="button" id="cancel-search" class="modal-close btn waves-effect waves-light right margined-sides">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>

        <div class="fixed-action-btn">
            <a 
                style="font-family: Pattaya" 
                class="btn-floating btn-large green modal-trigger" 
                href="#page-modal">
                <i class="large">{{page}}</i>
            </a>
            
            <ul>
                <li>
                    <a id="search-button" class="btn-floating red modal-trigger" href="#monetize-modal" >
                        <i class="material-icons">monetization_on</i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import BookReader from '../components/BookReader.vue'
import axios from 'axios'
import pdf from 'vue-pdf'
import $ from 'jquery'

var self;
var pageModal;

export default {
    components: { 
        BookReader,
        pdf
    },
    methods: {
        registerEvents(){
            $('#nav-left').bind('click', function(e) {
                if (self.page > 1){
                    self.page = self.page - 1;
                    $(window).scrollTop(0);
                }    
            }); 

            $('#nav-right').bind('click', function(e) {     
                if (self.page < self.numPages){
                    self.page = self.page + 1;
                    $(window).scrollTop(0);
                }    
            });

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
            pageModal = instances[0];
        },
        getMonetizationState(){
            return document.monetization.state;
        },
        getPaymentPointers(){
            axios.post(
                'http://localhost:3000/api/documents/payments',
                {
                    mongodb_url: process.env.VUE_APP_BIGCHAINDB_MONGO_DB,
                    transaction_id: this.id,
                    asset_id: this.book_metadata.asset_id
                }
            )
            .then(resp => {
                let data = resp.data;
                this.referenced_nodes = data.results;
                console.log("referenced nodes");
                console.log(this.referenced_nodes);
                this.setPaymentMetadata();
            })
            .catch(e => {
                console.log(e)
            })
        },
        setPaymentMetadata(){
            // start off at 100 and deduct for each referenced node
            var revenue_share = 100;
            for (var i=0; i < this.referenced_nodes.length; i++){
                var node = this.referenced_nodes[i];
                var share = parseInt(node.metadata.royalty);

                this.payment_pointers[node.metadata.payment_pointer] = share;
                revenue_share -= share;
            }
            this.payment_pointers[this.book_metadata.metadata.payment_pointer] = revenue_share;
            console.log(this.book_metadata)
            // then probabilistically select a pointer and set it
            this.pickPointer();
        },
        pickPointer () {
            var pointers = this.payment_pointers;
            const sum = Object.values(pointers).reduce((sum, weight) => sum + weight, 0)
            let choice = Math.random() * sum

            for (const pointer in pointers) {
                const weight = pointers[pointer]
                if ((choice -= weight) <= 0) {
                    this.payment_pointer = pointer;
                    return pointer;
                }
            }
        },
        getBook() {
            eventHub.$emit(
                'showMessage',
                'success',
                'Web Monetization',
                'State: ' + document.monetization.state,
                2000
            );

            axios.post(
                'http://localhost:3000/api/documents',
                {
                    mongodb_url: process.env.VUE_APP_BIGCHAINDB_MONGO_DB,
                    id: this.id
                }
            )
            .then(resp => {
                let data = resp.data;
                this.numPages = data.pages;
                console.log(data)
                var url = 'data:application/pdf;base64,' + data.document;
                this.src = url
                this.pdfList.push(url)
            })
            .catch(e => {
                console.log(e)
            })
        },
        getBookMetadata(){
            this.book_metadata = JSON.parse(localStorage.getItem(this.id));
        },
        onWindowLoad(){
            if (!document.monetization) {
                eventHub.$emit(
                    'showMessage',
                    'warn',
                    'Web Monetization',
                    'Please enable Web Monetization',
                    2000
                );
            } else {
                document.monetization.addEventListener('monetizationstart', this.getBook())
            }
        },
        password: function(updatePassword, reason) {
            updatePassword(prompt('password is "test"'));
        },
        error: function(err) {
            console.log(err);
        }
    },
    mounted(){
        this.show_header=false;
        this.registerEvents();
        this.UISetup();
    },
    created(){
        self = this;
        this.id = this.$route.params.id;
        this.title = this.$route.params.title;
        document.title = this.title;
        eventHub.$emit('showHeader', false);
        eventHub.$emit('hideMenu', 2, false);
        this.getBookMetadata();
        this.getPaymentPointers();
        window.addEventListener("load", this.onWindowLoad);
    },
    destroyed(){
        eventHub.$emit('hideMenu', 2, true);
    },
    data(){
        return {
            show_header: false,
            id: 0,
            title: '',
            book: {},
            pdfList: [],
            src:'',
            page: 1,
            numPages: 3,
            rotate: 0,
            book_metadata: {},
            referenced_nodes: {},
            payment_pointers: {},
            payment_pointer: '',
            payment_pk: ''
        }
    },
    metaInfo() {
        return {
            meta: [
                { name: 'monetization', content: this.payment_pointer},
            ]
        }
    }
}
</script>