<template>
    <div id="app">
        <section class="banner" id="top">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8">
                        <div class="left-banner-content">
                            <div class="text-content">
                                <div class="">
                                    <div class="logo"><a href="./library"><img src="../assets/images/logo_orange_circle.png" alt=""></a></div>
                                </div>
                                <h1>Write | Own | Collaborate</h1>
                                <div class="white-border-button">
                                    <a href="#services-section" class="scroll-link" data-id="services-section">Discover More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="right-banner-content">
                            <h2>Axone</h2>
                            <span>For <em>Authors</em> To <em>Create</em></span>
                            <div class="line-dec"></div>
                            <p>“ Through the use of Blockchain and Web Monetization technologies, 
                                Axone enables authors to truly own their work and earn 
                                income through royalties from other authors continuing their work.
                                Authors will use Google Docs to write their chapters and publish
                                each chapter (using the Axone Google Docs Plugin) onto a Blockchain 
                                Database. Take a look at the tutorial to learn more! ”</p>
                            <ul class="social-icons">
                                <!--<li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                <li><a href="#"><i class="fa fa-rss"></i></a></li>
                                <li><a href="#"><i class="fa fa-dribbble"></i></a></li>-->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="services" id="services-section">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
                            <div class="flipper first-service">
                                <div class="front">
                                    <div class="icon">
                                        <i class="large material-icons">mode_edit</i>
                                    </div>
                                    <h4>Write</h4>
                                </div>
                                <div class="back">
                                    <p> 
                                        Start your own book or continue an existing book, 
                                        chapter by chapter. Stuck on a chapter? Let others 
                                        finish the book for you and get paid royalties!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
                            <div class="flipper fourth-service">
                                <div class="front">
                                    <div class="icon">
                                        <i class="large material-icons">linear_scale</i>
                                    </div>
                                    <h4>Collaborate</h4>
                                </div>
                                <div class="back">
                                    <p>
                                        Are you stuck after the first chapter of your book? Publish it on
                                        Axone and let other talented authors continue your book! You can
                                        continue your book on another completely different and unique path
                                        after you find somemore inspiration! You get royalties from every
                                        author that directly continues from your chapter!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
                            <div class="flipper second-service">
                                <div class="front">
                                    <div class="icon">
                                        <i class="large material-icons">monetization_on</i>
                                    </div>
                                    <h4>Monetize</h4>
                                </div>
                                <div class="back">
                                    <p>
                                        Through web monetization, readers stream payments to your
                                        account. Authors who write a continuation of your chapter
                                        will pay royalties to your account. You determine the royalty
                                        percentage to be paid and you can change it with successive
                                        versions of your chapter.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
                            <div class="flipper third-service">
                                <div class="front">
                                    <div class="icon">
                                        <i class="large material-icons">store</i>
                                    </div>
                                    <h4>SELL</h4>
                                </div>
                                <div class="back">
                                    <p>
                                        Convert your chapter into a Non Fungible Token and list it
                                        on an NFT market to sell it. Ownership will be transferred to the
                                        buyer meaning that both the chapter and the future income will belong
                                        to the buyer. You can auction it to get the best deal!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <p>Copyright &copy; 2021 Axone 
                        
                        - <a rel="nofollow" href="./privacy" target="_parent">Privacy Policy</a> 
                        and <a rel="nofollow" href="./service" target="_parent">Terms Of Service</a></p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>

export default {
    mounted() {},
    created(){
        eventHub.$emit('showHeader', false);
        document.title = 'Home';
    },
    methods: {
        UISetup(){}
    }
}
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
    @import '../assets/css/variables';
    @import '../assets/css/templatemo-style';
</style>