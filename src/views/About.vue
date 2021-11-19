<template>
    <div id="app">
        <section class="row tm-section tm-col-md-reverse">
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-0">
                <div class="tm-flex-center p-5 tm-bg-color-secondary">
                    <div class="tm-max-w-400 tm-flex-center tm-flex-col">
                        <img src="../assets/images/AIFMRM_nav.png" alt="Image" class="rounded-circle mb-4">
                        <p class="tm-text-color-white tm-font-thin mb-0"></p>
                    </div>
                </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div class="tm-flex-center p-5">
                    <div class="tm-md-flex-center">
                        <h2 class="tm-text-color-primary mb-4">About This Dashboard</h2>
                        <p class="mb-4">
                            This website contains the fully digitized AIFMRM’s Equity Risk Service. 
                            This service is aimed at providing up-to-date risk measures and associated 
                            statistics for the stocks and indices that are listed on the Johannesburg Stock 
                            Exchange (JSE) using an interactive dashboard. The Equity Risk Service is based 
                            not only on the American and the British experience but also on an ongoing 
                            research programme at the University of Cape Town (UCT). 
                            The estimates are based on a price and volume series database sourced from the 
                            JSE Ltd, Bloomberg L.P. and INET BFA - IRESS.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="row tm-section">
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div class="tm-flex-center p-5">
                    <div class="tm-md-flex-center">
                        <h2 class="tm-text-color-primary mb-4">Landing Page</h2>
                        <p class="mb-4">
                            This is the main dashboard page. It allows you to plot the cumulative returns 
                            of each share in each index for a given market index over an adjustable period. 
                            You also can plot multiple shares for a comparative analysis. 
                            The betas of each shares can be viewed to see how consistent the betas 
                            are for each share(s) over time.  The dashboard also includes an 
                            interactive pie chart that breaks up the index into its respective 
                            constituent shares. Finally, if you need beta, alpha, specific or total 
                            risk information, this will also be available on this page. 
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-0">
                <div class="tm-flex-center p-5 tm-bg-color-secondary">
                    <div class="tm-max-w-400 tm-flex-center tm-flex-col">
                        <div class="icon">
                            <a href="./#">
                                <i class="fa fa-5x fa-chart-area"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="row tm-section">
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-0">
                <div class="tm-flex-center p-5 tm-bg-color-secondary">
                    <div class="tm-max-w-400 tm-flex-center tm-flex-col">
                        <div class="icon">
                            <a href="./#/betatables">
                                <i class="fa fa-5x fa-table"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div class="tm-flex-center p-5">
                    <div class="tm-md-flex-center">
                        <h2 class="tm-text-color-primary mb-4">Beta Tables</h2>
                        <p class="mb-4">
                            This page displays to the user either the share betas or the 
                            index level betas. It allows the user to filter through the tables 
                            via the columns as well as drag and drop the required tables.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="row tm-section">
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div class="tm-flex-center p-5">
                    <div class="tm-md-flex-center">
                        <h2 class="tm-text-color-primary mb-4">Index Metrics</h2>
                        <p class="mb-4">
                            This page allows you to access synthetic index data, distributed by industry 
                            over time. You will be able to access either betas, weights, systematic 
                            volatility or specific volatility and view the raw data as well as a 
                            visualised version of it. You will also be able to download the raw data.
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-0">
                <div class="tm-flex-center p-5 tm-bg-color-secondary">
                    <div class="tm-max-w-400 tm-flex-center tm-flex-col">
                        <div class="icon">
                            <a href="./#/indexmetrics">
                                <i class="fa fa-5x fa-chart-bar"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="row tm-section">
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-0">
                <div class="tm-flex-center p-5 tm-bg-color-secondary">
                    <div class="tm-max-w-400 tm-flex-center tm-flex-col">
                        <div class="icon">
                            <a href="./#/downloads">
                                <i class="fa fa-5x fa-download"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div class="tm-flex-center p-5">
                    <div class="tm-md-flex-center">
                        <h2 class="tm-text-color-primary mb-4">Custom Tables</h2>
                        <p class="mb-4">
                            A page that allows you to access any of the other tables of data and 
                            customize which columns to view. Additionally, you will also be able to 
                            download your customised table if you so require.  
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>