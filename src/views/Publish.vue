<template>
    <div id="app">
        <books-list
            :type="'component'" 
            :mode="'collection'" 
            :category="'popular'" 
            :shortList="true"
            :pageTitle="'Latest Books'">
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

        <div id="publish-modal" class="modal">
            <div class="modal-content">
                <h4>New Chapter</h4>
                <div class="row">
                <form class="col s12">

                    <div class="row small-margin">
                    <div class="input-field col s12">
                        <blockquote>
            Please fill in your private key for encrypting your document, otherwise generate a new key pair. For more information click here.
                        </blockquote>
                    </div>
                    </div>

                    <div class="row">
                    <div class="input-field col s12">
                        <span id="generate-key-pair" class="prefix clickable">
                        <i class="material-icons prefix tooltipped" data-position="bottom" data-tooltip="generate">public</i>
                        </span>
                        <input 
                        disabled
                        id="public_key-text-area"
                        type="text" 
                        class="validate">
                        <label for="public_key-text-area">Public Key</label>
                    </div>
                    </div>

                    <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">vpn_key</i>
                        <input 
                        id="private_key-text-area"
                        required="" 
                        aria-required="true" 
                        type="text" 
                        class="validate">
                        <label for="private_key-text-area">Private Key</label>
                    </div>
                    </div>

                    <div class="row small-margin">
                    <div class="input-field col s12">
                        <blockquote>
            Get your wallet address for creation of this asset on Ethereum through metamask. For more information click here.
                        </blockquote>
                    </div>
                    </div>

                    <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">lock</i>
                        <input 
                        id="address-text-area"
                        required="" 
                        aria-required="true" 
                        type="text" 
                        class="validate">
                        <label for="address-text-area">Wallet Address</label>
                    </div>
                    </div>

                    <div class="row small-margin">
                    <div class="input-field col s12">
                        <blockquote>
            Get your payment pointer from a webmonetization provider. For more information click here.
                        </blockquote>
                    </div>
                    </div>
                    
                    <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">monetization_on</i>
                        <input 
                        id="payment-text-area"
                        required="" 
                        aria-required="true" 
                        type="text"
                        class="validate">
                        <label for="payment-text-area">Payment Pointer</label>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            <div class="modal-footer">
                <button id="submit-publication" class="btn waves-effect waves-light right" type="submit">Publish</button>
            </div>
        </div>

        <div class="fixed-action-btn">
            <a class="btn-floating btn-large green">
                <i class="large material-icons">mode_edit</i>
            </a>
            <ul>
                <li>
                    <a href="#publish-modal" class="btn-floating blue modal-trigger">
                        <i class="material-icons">add</i>
                    </a>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
import BooksList from '../components/BooksList.vue'
//import $ from 'jquery'

export default {
    components: { BooksList },
    methods: {
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
        }
    },
    mounted(){
        this.UISetup();
    },
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