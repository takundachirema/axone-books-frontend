<template>
  <section class="book">
    <div class="dag__container">
        <div class="dag__more">
          <input type="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="image__btn" @click.prevent="toggleDag()" alt="">
        </div>
        <div class="dag">
          <div id="dag__cy" class="dag__cy"></div>
        </div>
    </div>
    <div class="book__container" v-if="bookLoaded">
      <header class="book__header" :class="{'book__header--page': type=='page'}" :style="{ 'background-image': 'url(' + bookBackdropSrc + ')' }">
        <div class="book__wrap book__wrap--header" :class="{'book__wrap--page': type=='page'}">
          <figure class="book__poster">
            <img v-if="bookPosterSrc" class="book__img" src="../assets/images/placeholder.png" v-img="bookPosterSrc">
            <img v-if="!bookPosterSrc" class="books-item__img is-loaded" src="../assets/images/no-image.png">
          </figure>
          <div class="book__title">
            <h1 class="book__title-text">
              {{ book.metadata.book_title }}
              <span v-if="book.metadata.chapter_title">{{ book.metadata.chapter_title }}</span>
            </h1>
          </div>
        </div>
      </header>
      <div class="book__main">
        <div class="book__wrap book__wrap--main" :class="{'book__wrap--page': type=='page'}">
          <div class="book__actions" >
            <button id="read" class="btn waves-effect waves-light" @click.prevent="readBook()">Read</button>
          </div>
          <div class="book__info">
            <div v-if="book.metadata.blurb" class="book__description">
              {{ book.metadata.blurb }}
            </div>
            <div class="book__details">
              <div v-if="book.metadata.genres.length" class="book__details-block">
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
import $ from 'jquery'
import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre';
import edgehandles from 'cytoscape-edgehandles';
import cxtmenu from 'cytoscape-cxtmenu';

var cy;
var self;

export default {
  props: ['book', 'type'],
  directives: {
    img: img,
    formatDate: formatDate
  },
  data(){
    return{
      bookLoaded: false,
      bookPosterSrc: '',
      bookBackdropSrc: '',
      userLoggedIn: storage.sessionId ? true : false,
      favoriteChecked: false,
      favorite: '',
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
        edgeType: function( sourceNode, targetNode ){
          //console.log(sourceNode)
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
              self.addNewNode(ele.data('id'), false);
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
              self.addNewNode(ele.data('id'), true);
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
      testElements: [
        {data: {id: 'all' ,title: 'Chapter 1: The boy who lived'}},
        {data: {id: 'female'}},
        {data: {id: 'edge1', source: 'all', target: 'female'}},
        {data: {id: 'male'}},
        {data: {id: 'edge2', source: 'all', target: 'male'}},
        {data: {id: 'female_2016'}},
        {data: {id: 'edgef16', source: 'female', target: 'female_2016'}},
        {data: {id: 'male_2017'}},
        {data: {id: 'edgem17', source: 'male', target: 'male_2017'}},
        {data: {id: 'male_2018'}},
        {data: {id: 'edgem18', source: 'male', target: 'male_2018'}},
      ],
      graphElements: []
    }
  },
  methods: {
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
        this.book.metadata.chapter_title, 
        this.book.metadata.cover,
        true,
        true
      )

      cy.center("#"+this.book.id);
      cy.zoom({
        level: 2
      });
      cy.panBy({
        x: -100,
        y: 150
      });
    },
    /**
     * book_id is the root element
     * linked_books is a list of the children or parents
     * children is a boolean indicating whether linked_books are children on parents
     */
    updateGraphData(book_id, linked_books, child_relationship) {
      for(var i = 0; i < linked_books.length; i++) {
        var book = linked_books[i]; 

        // put in the node
        this.pushNode(book.id, book.metadata.chapter_title, book.metadata.cover);

        // put in the edge
        if (child_relationship){
          this.pushEdge(book_id, book.id);
        }else{
          this.pushEdge(book.id, book_id);
        }
      }
    },
    pushNode(id, title, ipfs_id=null, create_child=false, create_parent=false, publish=false){
      // put in the node
      var node_data = this.getNodeData(id, title);
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
    addNewNode(id, child_relationship = false){
      var new_id = id+"-"+child_relationship
      
      this.pushNode(
        new_id,
        "New Chapter",
        null,
        false,
        false,
        true
      );

      if (child_relationship){
        this.pushEdge(id, new_id);
      }else{
        this.pushEdge(new_id, id);
      }

      const layout = cy.makeLayout(this.dagreLayout);
      layout.run();
    },
    getNodeData(id, title){
      var node_data = {}
      node_data["data"] = {}
      node_data["data"]["id"] = id;
      node_data["data"]["title"] = title;

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
      console.log("push menu");
      console.log(menu);
      menu.selector = "#"+id;

      menu.commands[0].select = function(ele){
        self.addNewNode(ele.data('id'), false);
      }

      menu.commands[1].select = function(ele){}

      menu.commands[2].select = function(ele){
        self.addNewNode(ele.data('id'), true);
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
    showBook(){
      this.poster();
      this.backdrop();
      if(this.userLoggedIn){
        this.checkIfInFavorites(this.book.id);
      } else {
        this.bookLoaded = true;
      }
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
    checkIfInFavorites(id){
      axios.get(`https://api.thebookdb.org/3/book/${id}/account_states?api_key=${storage.apiKey}&session_id=${storage.sessionId}`)
      .then(function(resp){
          this.favorite = resp.data.favorite;
          this.favoriteChecked = true;
          this.bookLoaded = true;
      }.bind(this))
    },
    toggleDag(){
      $('.dag').toggleClass('open');
      //$('.dag__cy').toggleClass('open');
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
    this.prepareGraph();
  },
  created() {
    self = this;
    this.showBook();
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
