<template>
  <section class="book">
    <div class="dag__container">
        <div class="dag__more">
          <input id="show-dag" type="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="image__btn" alt="">
        </div>
        <div class="dag">
          <div id="dag__cy" class="dag__cy"></div>
        </div>
    </div>

    <div class="publish__container">
      <form id="publish-form" class="publish col s12" onsubmit="return false">
          <div class="row small-margin">
            <div class="input-field col s12">
                <blockquote>
  Please select the document version. For more information click here.
                </blockquote>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
                <i class="material-icons prefix">format_list_numbered</i>
                <select id="version_select" class="materialSelect"></select>
                <label for="version_select">Version</label>
            </div>
          </div>

          <div class="row small-margin">
            <div class="input-field col s12">
                <blockquote>
    Please fill in your private key for encrypting your document, otherwise generate a new key pair. For more information click here.
                </blockquote>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
                <span id="generate-keys" class="prefix clickable">
                <i class="material-icons prefix tooltipped" data-position="bottom" data-tooltip="generate">public</i>
                </span>
                <input 
                disabled
                id="pk_text-area"
                type="text" 
                class="validate">
                <label for="pk_text-area">Public Key</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
                <i class="material-icons prefix">vpn_key</i>
                <input 
                id="sk_text-area"
                required="" 
                aria-required="true" 
                type="text" 
                class="validate">
                <label for="sk_text-area">Private Key</label>
            </div>
          </div>

          <!-- The address will only be used when publishing asset on Ethereum   -->
          <!--<div class="row small-margin">
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
          </div> -->

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

          <div class="row small-margin">
            <div class="input-field col s12">
                <blockquote>
    This is your royalty fee payment based on the chapters you have referenced. For more information click here.
                </blockquote>
            </div>
          </div>

          <div class="row small-margin">
            <div class="col s12">
              <progress-bar bar-color="#dc720f" :val="royalty_paid" :text="royalty_paid+'%'"></progress-bar>
            </div>
          </div>

          <div class="row small-margin">
            <div class="input-field col s12">
                <blockquote>
    Set your royalty fee for chapters that will reference your chapter. For more information click here.
                </blockquote>
            </div>
          </div>
          
          <div class="row">
            <div class="input-field col s12">
                <i class="material-icons prefix"><b style="font-weight: 900">%</b></i>
                <input 
                  id="royalty-text-area"
                  required=""
                  aria-required="true" 
                  type="number"
                  value="5">
                <label for="payment-text-area" class="active">Royalty Fee</label>
            </div>
          </div>

          <div class="h50px w100">
            <button type="button" id="cancel-publish" class="btn waves-effect waves-light right margined-sides">Cancel</button>
            <button id="submit-publication" class="btn waves-effect waves-light right margined-sides" type="submit">Publish</button>
          </div>

        </form>
    </div>

    <div class="book__container open" v-if="bookLoaded">
      <header class="book__header" :class="{'book__header--page': type=='page'}" :style="{ 'background-image': 'url(' + bookBackdropSrc + ')' }">
        <div class="book__wrap book__wrap--header" :class="{'book__wrap--page': type=='page'}">
          <figure class="book__poster">
            <img v-if="bookPosterSrc" class="book__img" src="../assets/images/placeholder.png" v-img="bookPosterSrc">
            <img v-if="!bookPosterSrc" class="books-item__img is-loaded" src="../assets/images/book_cover.jpg">
          </figure>
          <div class="book__title">
            <h1 v-if="book.metadata.book_title" class="book__title-text">
              {{ book.metadata.book_title }}
              <span v-if="book.metadata.chapter_title">{{ book.metadata.chapter_title }}</span>
            </h1>
            
            <h1 v-if="!book.metadata.book_title" class="book__title-text">
              Transaction ID
              <div class="input-field col s12 id_container">
                <i 
                  id="copy_id" 
                  class="material-icons prefix clickable tooltipped"
                  data-position="left" 
                  data-tooltip="Copy Id">
                    content_copy
                </i>
                <input 
                  readonly 
                  id="transaction_id" 
                  :value="book.id" 
                  type="text">
              </div>
            </h1>
            
          </div>
        </div>
      </header>
      <div class="book__main">
        <div class="book__wrap book__wrap--main" :class="{'book__wrap--page': type=='page'}">
          <div class="book__actions" >
            <button v-if="book.transaction_type !== 'CREATE'" id="read" class="btn waves-effect waves-light" @click.prevent="readBook()">Read</button>
            <button v-if="book.transaction_type == 'CREATE'" id="edit" class="btn waves-effect waves-light" @click.prevent="editBook()">Edit</button>
            <div v-if="book.transaction_type !== 'CREATE'" class="input-field col s12 id_container">
              <i 
                id="copy_id" 
                class="material-icons prefix clickable tooltipped"
                data-position="left" 
                data-tooltip="Copy Id">
                  content_copy
              </i>
              <input 
                readonly 
                id="transaction_id" 
                :value="book.id" 
                type="text"
                >
            </div>
          </div>
          <div class="book__info">
            <div v-if="book.metadata.blurb" class="book__description">
              {{ book.metadata.blurb }}
            </div>
            <div v-if="!book.metadata.blurb" class="book__description">
              Please click the Edit Button and add the Axone addon for Google Docs to publish your document after editing.
            </div>
            <div class="book__details">
              <div v-if="book.metadata.genres" class="book__details-block">
                <h2 class="book__details-title">
                  Genres
                </h2>
                <div class="book__details-text">
                  {{ nestedDataToString(book.metadata.genres) }}
                </div>
              </div>
              <div v-if="book.metadata.published" class="book__details-block">
                <h2 class="book__details-title">
                  Release Date
                </h2>
                <div class="book__details-text" v-formatDate="book.metadata.published"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import storage from '../storage.js'
import img from '../directives/v-image.js'
import formatDate from '../directives/v-formatDate.js'
import { ModelSelect } from 'vue-search-select'
import $ from 'jquery'
import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre';
import edgehandles from 'cytoscape-edgehandles';
import cxtmenu from 'cytoscape-cxtmenu';
import Base58 from 'base-58';
import nacl from "tweetnacl";
import ProgressBar from 'vue-simple-progress'

const driver = require('bigchaindb-driver')

var cy;
var self;
var publishNode;

export default {
  props: ['book', 'type'],
  directives: {
    img: img,
    formatDate: formatDate
  },
  components: {
      ModelSelect,
      ProgressBar
  },
  data(){
    return{
      bookLoaded: false,
      bookPosterSrc: '',
      bookBackdropSrc: '',
      userLoggedIn: storage.sessionId ? true : false,
      favoriteChecked: false,
      favorite: '',
      royalty_paid: '10',
      // keeps nodes loaded so far
      nodes: {},
      // keeps adjacent nodes for clicked node
      adjacentNodes: {},
      versionCodes: [],
      versionCode: "",
      colaLayout: {
        name: "cola",
        handleDisconnected: true,
        animate: true,
        avoidOverlap: true,
        infinite: false,
        unconstrIter: 1,
        userConstIter: 0,
        allConstIter: 1,
        ready: e => {
            e.cy.fit()
            e.cy.center()
        }
      },
      dagreLayout: {
        name: 'dagre',
        rankDir: 'LR',
        animate: true,
        fit: false,
        avoidOverlap: true,
        padding: 50,
        spacingFactor: 1.2
      },
      edgesLayout: {
        snap: true,
        /**
         * return undefined if the source node version is > target node
         */
        edgeType: function( sourceNode, targetNode ) {
          var source_data = sourceNode._private.data;
          var target_data = targetNode._private.data;

          if (source_data == undefined || 
              target_data == undefined ||
              source_data.version == undefined || 
              target_data.version == undefined){
            return undefined;
          }

          var source_version = source_data.version;
          var target_version = target_data.version;

          if (source_version !== 0 && target_version !== 0){
            return undefined;
          }

          if (source_version === 0){
            source_version = source_data.parent_version;
          }else if (target_version === 0){
            target_version = target_data.parent_version;
          }
          
          var source_version_f = parseFloat(source_version);
          var target_version_f = parseFloat(target_version);

          console.log(source_version_f+" - "+target_version_f)

          if (source_version_f <= target_version_f){
            return 'flat';
          }

          return undefined;
        },
      },
      menuLayout: {
        menuRadius: 100, // the radius of the circular menu in pixels
        selector: '#node', // elements matching this Cytoscape.js selector will trigger cxtmenus
        commands: [
          {
            // merge is for creating a parent. It points to the child hence merge name
            content: '<i class="material-icons">call_merge</i>',
            contentStyle: {"pointer-events": "all"},
            select: function(ele){
              self.addNewNode(ele.data('id'), ele.data('id'), false);
            },
            enabled: false
          },
          {
            // publish is only for new nodes
            content: '<i class="material-icons">book</i>',
            contentStyle: {"pointer-events": "all"},
            select: function(ele){
              
            },
            enabled: false
          },
          {
            // split is for creating child. It points out meaning reproduce.
            content: '<i class="material-icons">call_split</i>',
            contentStyle: {"pointer-events": "all"},
            select: function(ele){
              self.addNewNode(ele.data('id'), ele.data('version'), true);
            },
            enabled: false
          }
				],
        atMouse: false,
        openMenuEvents: 'cxttap', // cytoscape events that will open the menu (space separated)
      },
      graphStyle: [{ // the stylesheet for the graph
        selector: 'node',
        style: {
          'label': 'data(title)',
          'font-size': '0.5em',
          'font-family': 'Pattaya',
          'height': 80,
          'width': 80,
          'background-fit': 'cover',
          'border-color': '#000',
          'border-width': 3,
          'border-opacity': 0.5
        }},{
        selector: 'edge',
        style: {
          'width': 5,
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          'line-color': '#ffaaaa',
          'target-arrow-color': '#ffaaaa',
          'taxi-direction': 'rightward'
        }},{
        selector: '.eh-handle',
        style: {
          'background-color': 'red',
          'width': 12,
          'height': 12,
          'shape': 'ellipse',
          'overlay-opacity': 0,
          'border-width': 12,
          'border-opacity': 0
        }},{
        selector: '.eh-hover',
        style: {
          'background-color': 'red'
        }},{
        selector: '.eh-source',
        style: {
          'border-width': 2,
          'border-color': 'red'
        }},{
        selector: '.eh-target',
        style: {
          'border-width': 2,
          'border-color': 'red'
        }},{
        selector: '.eh-preview, .eh-ghost-edge',
        style: {
          'background-color': 'red',
          'line-color': 'red',
          'target-arrow-color': 'red',
          'source-arrow-color': 'red'
        }},{
        selector: '.eh-ghost-edge.eh-preview-active',
        style: {
          'opacity': 0
        }}
      ],
      graphElements: []
    }
  },
  methods: {
    UISetup(){
      var elems = document.querySelectorAll('select');
      M.FormSelect.init(elems, {});

      elems = document.querySelectorAll('.tooltipped');
      M.Tooltip.init(elems, {});

      // setup listener for custom event to re-initialize on change
      $('.materialSelect').on('contentChanged', function() {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
      });
    },
    registerEvents(){
      $('#generate-keys').bind('click', function(e) {     
        self.generateKeyPair();      
      }); 

      $('#show-dag').bind('click', function(e) {
        if (self.book !== null && self.book.transaction_type !== "CREATE"){
          self.toggleClass('dag','open'); 
        }
      });

      $('#cancel-publish').bind('click', function(e) {
        if (self.book == null){    
          eventHub.$emit('closeBookPopup');
        }else{
          self.publishCancel();
        }
      });

      $("#publish-form").submit(function () {
        self.publishChapter();
        return false;
      });

      $("#copy_id").bind('click', function(e) {
        $("#transaction_id").select();
        document.execCommand('copy');
      });

      $('#royalty-text-area').keyup(function(event) {
        var number = parseInt($('#royalty-text-area').val());
        console.log(number);
        if (Number.isNaN(number)){
          $('#royalty-text-area').val("");
        }else if (number > 100){
          $('#royalty-text-area').val(Math.floor(number/10));
        }
      });
    },
    prepareGraph() {

      cytoscape.use(dagre);
      //cytoscape.use(cola);

      try {
        cytoscape.use(cxtmenu);
        cytoscape.use(edgehandles);
      }
      catch (e) {
        console.log(e);
      }
      
      cy = cytoscape({
        container: document.getElementById("dag__cy"),
        style: this.graphStyle,
        //elements: this.testElements,
        elements: this.graphElements,
        layout: this.dagreLayout
        //layout: this.colaLayout
      });
      cy.cxtmenu(this.menuLayout);
      cy.edgehandles(this.edgesLayout);

      // push the first node into graph
      this.pushNode(
        this.book.id, 
        this.book.asset_id,
        this.book.version,
        this.book.metadata.royalty,
        this.book.metadata.chapter_title, 
        this.book.metadata.cover,
        true,
        true
      )

      // set listener for node clicks
      cy.on('click', 'node', function(evt){
        self.nodeClickListener(evt.target._private.data);
      });

      cy.center("#"+this.book.id);
      cy.zoom({
        level: 2
      });
      cy.panBy({
        y: 200
      });
    },
    nodeClickListener(data){
      console.log(data);

      var asset_id = data.asset_id;
      var id = data.id;

      if (asset_id in this.adjacentNodes){
        return;
      }

      // Get adjacent nodes /documents/adjacent
      axios.post(
        'http://localhost:3000/api/documents/adjacent',
        {
          mongodb_url: process.env.VUE_APP_BIGCHAINDB_MONGO_DB,
          asset_id: asset_id
        }
      )
      .then(resp => {
          let data = resp.data;
          self.adjacentNodes[asset_id] = data.results;
          console.log(data.results)
          self.updateGraphData(id, data.results);
      })
      .catch(e => {
          console.log(e)
      })
    },
    /**
     * book_id is the root element
     * linked_books is a list of the children or parents
     * children is a boolean indicating whether linked_books are children on parents
     */
    updateGraphData(book_id, linked_books) {
      for(var i = 0; i < linked_books.length; i++) {
        var book = linked_books[i]; 

        // put in the node
        this.pushNode(
          book.id, 
          book.asset_id, 
          book.version,
          book.metadata.royalty,
          book.metadata.chapter_title, 
          book.metadata.cover,
          true,
          true,
          false
        );

        // put in the edge
        if (book.is_parent){
          this.pushEdge(book.id, book_id);
        }else{
          this.pushEdge(book_id, book.id);
        }

        const layout = cy.makeLayout(this.dagreLayout);
        layout.run();
      }
    },
    pushNode(id, asset_id, version, royalty, title, ipfs_id=null, create_child=false, create_parent=false, publish=false, parent_version = 0){
      // put in the node
      var node_data = this.getNodeData(id, asset_id, version, royalty, title, parent_version);
      cy.add(node_data)

      this.pushMenu(id, create_child, create_parent, publish);

      // put in the styling
      if (ipfs_id !== null){
        this.pushStyle(id, ipfs_id);
      }
    },
    /**
     * If child_relationship = true, id is the parent.
     * That means the source node is id and target is new_id.
     */
    addNewNode(id, version, child_relationship = false){
      var new_id = id+"-"+child_relationship
      
      this.pushNode(
        new_id,
        new_id,
        0,
        0,
        "New Chapter",
        null,
        false,
        false,
        true,
        version
      );

      if (child_relationship){
        this.pushEdge(id, new_id);
      }else{
        this.pushEdge(new_id, id);
      }

      const layout = cy.makeLayout(this.dagreLayout);
      layout.run();
    },
    getNodeData(id, asset_id, version, royalty, title, parent_version = 0){
      var node_data = {}
      node_data["data"] = {}
      // id is the transaction ID. unique for every node
      node_data["data"]["id"] = id;
      // asset_id is ID of asset represented by the node.
      // this is not unique for every node since there can be different versions of one asset.
      node_data["data"]["asset_id"] = asset_id;
      node_data["data"]["title"] = title;
      node_data["data"]["version"] = version;
      node_data["data"]["royalty"] = royalty;
      node_data["data"]["parent_version"] = parent_version;

      return node_data;
    },
    pushStyle(id, ipfs_id){
      var node_style = this.getNodeStyle(id, ipfs_id);
      var graph_style = cy.style().json();

      graph_style.push(node_style);

      console.log("current style")
      console.log(graph_style)

      cy.style().fromJson(graph_style).update();
      console.log("here 1")
    },
    pushMenu(id, create_child=false, create_parent=false, publish=false){
      var menu =  JSON.parse(JSON.stringify(this.menuLayout));
      // console.log("push menu");
      // console.log(menu);
      menu.selector = "#"+id;

      menu.commands[0].select = function(node){
        self.addNewNode(node.data('id'), node.data('version'), false);
      }

      menu.commands[1].select = function(node){
        console.log(node._private);
        self.showPublishChapter(node._private);
      }

      menu.commands[2].select = function(node){
        self.addNewNode(node.data('id'), node.data('version'), true);
      }
      
      if (create_parent){
        menu.commands[0].enabled = true;
      }
      if (publish){
        menu.commands[1].enabled = true;
      }
      if (create_child){
        menu.commands[2].enabled = true;
      }
      cy.cxtmenu(menu);
    },
    getNodeStyle(id, ipfs_id){
      var node_style = {}
      node_style["selector"] = "#"+id;
      node_style["style"] = {}
      node_style["style"]["background-image"] = process.env.VUE_APP_IPFS_GATEWAY + ipfs_id;

      return node_style;
    },
    pushEdge(from_id, to_id){
      var edge_data = this.getEdgeData(from_id, to_id);
      cy.add(edge_data)
    },
    getEdgeData(from_id, to_id){
      // put in the edge
      var edge_data = {}
      edge_data["data"] = {}
      edge_data["data"]["id"] = from_id+"-"+to_id;
      edge_data["data"]["source"] = from_id;
      edge_data["data"]["target"] = to_id;

      return edge_data;
    },
    readBook(){
      let route = this.$router.resolve('/read');
      window.open(route.href+"/"+this.book.id+"/"+this.book.metadata.book_title, '_blank');
    },
    editBook(){
      window.open("https://docs.google.com/document/create", '_blank');
    },
    showBook(){
      this.bookLoaded = true;

      this.poster();
      this.backdrop();
      
      // Push state
      if(storage.createBookPopup){
        storage.bookPath = '/book/' + this.book.id;
        history.pushState({ popup: true }, null, storage.bookPath);
        storage.createBookPopup = false;
      }
      // Change Page title
      document.title = this.book.metadata.book_title;
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
    publishCancel(){
      this.toggleClass('publish','open');
      this.toggleClass('book__container','open');
      const el = this.$el.getElementsByClassName('dag__container')[0];
      
      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
      }
    },
    showPublishChapter(node) {
      this.publishNode = node;
      
      // Now get the max parent version and min child version to limit version selection
      // e.g. if 2 parent versions 1 and 2 and child version is 3,
      // then the node will be limited to version between 2 and 3.
      var node_id = node.data.id;
      var edges = node.edges;
      var max_parent_version = 0
      var min_child_version = 0
      var royalty_total =0;

      for (var i=0;i<edges.length;i++){
        var edge = edges[i];

        var source_data = edge._private.source._private.data;
        var target_data = edge._private.target._private.data;

        console.log("versions: "+target_data.version+" "+source_data.version)

        if (node_id === source_data.asset_id){
          var child_version = parseFloat(target_data.version);
          royalty_total += parseInt(target_data.royalty);
          if (min_child_version == 0 || child_version < min_child_version){ 
            min_child_version = child_version;
          }
        }else{
          var parent_version = parseFloat(source_data.version);
          royalty_total += parseInt(source_data.royalty);
          if (parent_version > max_parent_version) max_parent_version = parent_version;
        }
      }

      if (royalty_total > 100){
        eventHub.$emit(
          'showMessage',
          'error',
          'Royalty must be less than 100%. Please reference fewer nodes.');
        return;
      }
      
      this.royalty_paid = royalty_total;
      this.populateSelectItems(max_parent_version, min_child_version);
      this.toggleClass('publish','open');
      this.toggleClass('dag','open');
      this.toggleClass('book__container','open');
    },
    populateSelectItems(min, max){
      
      // first remove all the options
      $('#version_select')
      .find('option')
      .remove()
      .end();

      if (min == 0 && max == 0){
        // add new value
        var $newOpt = $("<option>").attr("value","1.0").text("1.0")
        $("#version_select").append($newOpt);
      }else{
        // toString() removes any trailing zeros in the decimal
        var min_l = min.toString();
        var max_l = max.toString();

        // find the number of shifts of decimal point to make these int's
        // e.g. 1.35 would give 2 since the . should shift 2 steps right to make 135.
        var min_l_d = min_l.indexOf(".");
        if (min_l_d == -1) min_l_d = min_l.length - 1

        var max_l_d = max_l.indexOf(".");
        if (max_l_d == -1) max_l_d = max_l.length - 1

        var min_d = min_l.length - min_l_d - 1;
        var max_d = max_l.length - max_l_d - 1;

        // This will be the multiplier to make these into numbers
        var exp = Math.max(min_d, max_d) + 1;
        var multiplier = Math.pow(10, exp);
        
        var min_int = min * multiplier;
        var max_int = max * multiplier;

        if (max_int == 0){
          // We add the 1 so that if its perfect version e.g. 3.0 user has ability to choose 4.0
          max_int = min_int + 1*multiplier + 1;
        }
        
        console.log(min_int+" - "+max_int+" - "+multiplier)
        for (var i = min_int + 1; i < max_int; i++) {
          var version = i/parseFloat(multiplier);
          version = version.toFixed(exp);

          var version_l = version.toString();
          //console.log(i+" : "+version_l)
          var $newOpt = $("<option>").attr("value",version_l).text(version_l);
          $("#version_select").append($newOpt);
        }
      }

      // fire custom event anytime you've updated select
      $("#version_select").trigger('contentChanged');
    },
    publishChapter() {
      
      if (self.book == null){
        this.postData([],[],[],[]);
        return;
      }

      var node_id = this.publishNode.data.id;
      var edges = this.publishNode.edges;
      var parents = []
      var children = []
      var parents_txns = []
      var children_txns = []

      for (var i=0;i<edges.length;i++){
        var edge = edges[i];

        var source_data = edge._private.source._private.data;
        var target_data = edge._private.target._private.data;

        // when the new node is the source it means the edge is like:
        // NN ----> ON
        // NN (new node) is the parent and ON (old node) is the child
        if (node_id === source_data.asset_id){
          children.push(target_data.asset_id);
          children_txns.push(target_data.id)
        }else{
          parents.push(source_data.asset_id);
          parents_txns.push(source_data.id);
        }
      }
      // console.log(children);
      // console.log(parents);
      this.postData(parents, children, parents_txns, children_txns);
    },
    generateKeyPair() {
      const key_pair = nacl.sign.keyPair();

      var public_key = Base58.encode(key_pair["publicKey"]);

      // nacl private key has the last 32 bytes as the public key
      var private_key = Base58.encode(key_pair["secretKey"]);

      $("#pk_text-area").val(public_key);
      $("#sk_text-area").val(private_key);
      M.updateTextFields();
    },
    /**
     * ED key pair is only for signing.
     * CV key pairs can be used for encryption.
     * We use ed2curve library to convert between the 2.
     * */
    postData(parents, children, parents_txns, children_txns){
      let version = $("#version_select").val();
      let edPrivateKey = $("#sk_text-area").val();
      //let address = $("#address-text-area").val();
      let payment = $("#payment-text-area").val();
      let royalty_fee = parseInt($("#royalty-text-area").val()) || 0;

      var api_url = process.env.VUE_APP_BIGCHAINDB_API;

      var edPrivateKey_32 = Base58.encode(Base58.decode(edPrivateKey).slice(0, 32));
      var edPublicKey = Base58.encode(Base58.decode(edPrivateKey).slice(32));

      // Construct a transaction payload
      const tx = driver.Transaction.makeCreateTransaction(
        // Define the asset to store.
        { 
          public_key: edPublicKey,
          version: version,
          parents: parents,
          children: children,
          parents_transactions: parents_txns,
          children_transactions: children_txns,
          published: new Date().toString()
        },
        // Metadata contains information about the book.
        {
          tags: "Axone Books",
          payment_pointer: payment,
          royalty: royalty_fee,
          published: new Date().toString()
        },
        // A transaction needs an output
        [ driver.Transaction.makeOutput(
                driver.Transaction.makeEd25519Condition(edPublicKey))
        ],
        edPublicKey
      )

      // Sign the transaction with private keys
      const txSigned = driver.Transaction.signTransaction(tx, edPrivateKey_32)

      // Send the transaction off to BigchainDB
      let conn = new driver.Connection(api_url)

      conn.postTransactionCommit(txSigned)
        .then(res => {
            console.log('Transaction', txSigned.id, 'accepted')
        })
    },
    toggleClass(class_name, class_change){
      $('.'+class_name).toggleClass(class_change);
    },
    toggleFavorite(){
      let favoriteInvert = !this.favorite;
      this.favorite = '';
      axios.post(`https://api.thebookdb.org/3/account/${storage.userId}/favorite?api_key=${storage.apiKey}&session_id=${storage.sessionId}`, {
        'media_type': 'book',
        'media_id': this.id,
        'favorite': favoriteInvert
      })
      .then(function(resp){
        this.favorite = favoriteInvert;
        eventHub.$emit('updateFavorite');
      }.bind(this));
    }
  },
  watch: {
    id: function(val){
      this.fetchBook(val);
    }
  },
  mounted() {
    this.registerEvents();
    this.UISetup();
    if (this.book == null){
      this.toggleClass('publish','open');

      // disable it first so that the refresh in populateSelectItems() make it so
      $('.materialSelect').attr('disabled', 'disabled');
      this.populateSelectItems(0,0);
    }else if (this.book.transaction_type !== "CREATE"){
      this.prepareGraph();
    }
  },
  created() {
    self = this;
    if (this.book !== null){
      this.showBook();
    }
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
