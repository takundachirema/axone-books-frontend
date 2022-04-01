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
                                <h1>Create | Own | Collaborate</h1>
                                <div class="white-border-button">
                                    <a href="#services-section" class="scroll-link" data-id="services-section">Discover More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="right-banner-content">
                            <h2>Axone</h2>
                            <span>For <em>Creators</em> To <em>Collaborate</em> and <em>Innovate</em></span>
                            <div class="line-dec"></div>
                            <p>“ Axone is a platform for content creators to collaborate in a unique way. 
                                Inspired by the theory of “parallel universes”, 
                                Axone allows content to have alternative parallel paths. 
                                Through collaboration, different creators can expand a piece of content by creating an 
                                alternate version of it! Alternate versions of the alternate version can be created resulting 
                                in an alternative path of a content’s evolution! Features on Axone include <em>Web Monetization</em> and 
                                <em>NFT Minting</em>. See below for more!”</p>
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
                                    <h4>Create</h4>
                                </div>
                                <div class="back">
                                    <p> 
                                        Create and publish your content whether it be a book chapter, animation episode, digital art,
                                        you name it, or continue an existing piece of content e.g. the next chapter of a book written
                                        by another author or the next episode of an animated series by another creator!
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
                                        Stuck on a project? Publish whatever small content blocks you have done so far and 
                                        let others continue your work and get paid royalties for it! It can be the first chapter 
                                        of your book or a short 2 minute animated clip; publish it on
                                        Axone and let other talented creators continue your work! You can
                                        continue your book or series on another completely different and unique path
                                        after you find somemore inspiration! You get royalties from every
                                        creator that directly continues from your work!
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
                                        Through web monetization, viewers of your content stream payments to your web monetization
                                        account. Creators who create continuations of your content
                                        will also pay royalties to your account. You determine the royalty
                                        percentage to be paid and you can change it as your content becomes popular!
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
                                        Convert your content into a Non Fungible Token and list it
                                        on the Axone NFT marketplace to sell it. You can create as many NFTs from one content and split
                                        the web monetization revenue with the owner of each NFT! For example 100 NFTs means each
                                        NFT holder will get 1% of the web monetization revenue, thus making your NFTs more valuable!
                                        You don't have to list them all at once, list a few and then the rest when they are popular!
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