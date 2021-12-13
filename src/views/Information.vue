<template>
    <div id="app">
        <section id="versions" class="row" style="margin-left: 5px">
            <div class="col-sm-0 col-md-3 col-lg-3 col-xl-3"/>
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div class="input-field col s12">
                    <blockquote>
                        <h5>Document Versions</h5>
                    </blockquote>
                    <blockquote style="border-left: 2px solid #64b5f6;">
                        The document version will correspond to the chapter of a 
                        book in many scenarios. This is not enforced to allow for different 
                        scenarios depending on the author, but this makes it easier for the continuation
                        of the book.
                        <br><br>
                        A chapter that continues from a previous chapter must have a version number That
                        is greater than the previous chapter. This is enforced, to make sure that the
                        structure of a book is kept.
                    </blockquote>
                </div>
            </div>
            <div class="col-sm-0 col-md-3 col-lg-3 col-xl-3"/>
        </section>
        <section id="keys" class="row" style="margin-left: 5px">
            <div class="col-sm-0 col-md-3 col-lg-3 col-xl-3"/>
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div class="input-field col s12">
                    <blockquote>
                        <h5>Public Key Cryptography</h5>
                    </blockquote>
                    <blockquote style="border-left: 2px solid #64b5f6;">
                        Public key cryptography uses a pair of keys to encrypt and decrypt 
                        data to protect it against unauthorized access or use. You will receive
                        a public and private key pair. Keep the private key <b>SECRET</b> add
                        never give it away. You'll use it when you update your chapter add
                        when you transfer it to a new owner. 
                        <br><br>
                        Please <b>DO NOT LOSE</b> your
                        private key as it is not recoverable and you lose the priviledge to 
                        edit your chapter. <b>NOTE</b> We use the Ed25519 signatures with the
                        private key having the public key in it as the last 32 bits. Therefore
                        you only need to know you private key, the public key can be derived from
                        your private key. For more information on public key cryptography click 
                        <a href="https://en.wikipedia.org/wiki/Public-key_cryptography" target="_blank">
                        here
                        </a>.
                    </blockquote>
                </div>
            </div>
            <div class="col-sm-0 col-md-3 col-lg-3 col-xl-3"/>
        </section>
        <section id="webmonetization" class="row" style="margin-left: 5px">
            <div class="col-sm-0 col-md-3 col-lg-3 col-xl-3"/>
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div class="input-field col s12">
                    <blockquote>
                        <h5>Web Monetization</h5>
                    </blockquote>
                    <blockquote style="border-left: 2px solid #64b5f6;">
                        Web Monetization (WM) is a standard that allows small amount payments
                        or micropayments to be made from users consuming content on a website
                        to the content creator or that website. To receive these payments,
                        the content creator must have a WM receiver (WMR) and like 
                        <a href="https://uphold.com/">uphold</a> and you'll get a payment pointer.
                        For more information on WM please click
                        <a href="https://webmonetization.org/docs/explainer/" target="_blank">
                        here.
                        </a> 
                        To get more information on setting up a WM receiver click
                        <a href="https://webmonetization.org/docs/uphold/" target="_blank">
                        here.
                        </a>
                    </blockquote>
                </div>
            </div>
            <div class="col-sm-0 col-md-3 col-lg-3 col-xl-3"/>
        </section>
        <section id="royalty" class="row" style="margin-left: 5px">
            <div class="col-sm-0 col-md-3 col-lg-3 col-xl-3"/>
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div class="input-field col s12">
                    <blockquote>
                        <h5>Royalty Fees</h5>
                    </blockquote>
                    <blockquote style="border-left: 2px solid #64b5f6;">
                        Any chapters that reference the one you created will pay a royalty Fee
                        that you set. Setting a high royalty fee might prohibit authors creating
                        chapters that are a continuation from yours. The recommended royalty Fee
                        is 5%.
                    </blockquote>
                </div>
            </div>
            <div class="col-sm-0 col-md-3 col-lg-3 col-xl-3"/>
        </section>
        <section id="transactions" class="row" style="margin-left: 5px">
            <div class="col-sm-0 col-md-3 col-lg-3 col-xl-3"/>
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div class="input-field col s12">
                    <blockquote>
                        <h5>Transactions</h5>
                    </blockquote>
                    <blockquote style="border-left: 2px solid #64b5f6;">
                        The creation of a chapter and any subsequent updates to it will create
                        a transaction which has a unique transaction id. You'll need the
                        <b>CURRENT</b> transaction id when you update or transfer a chapter. 
                        Each of these operations create a new transaction id. So if you 
                        look on the updated chapter the id will be different from before.
                    </blockquote>
                </div>
            </div>
            <div class="col-sm-0 col-md-3 col-lg-3 col-xl-3"/>
        </section>
    </div>
</template>

<script>

export default {
    mounted() {},
    created(){
        eventHub.$emit('showHeader', false);
        document.title = 'Information';
    },
    methods: {
        UISetup(){}
    }
}
</script>