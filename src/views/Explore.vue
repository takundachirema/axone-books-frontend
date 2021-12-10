<template>
  <div id="app">
    <div class="dag__container dag__full">
        <div class="dag opened">
          <div id="dag__cy" class="dag__cy"></div>
        </div>
    </div>
  </div>
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
  props: ['pk', 'type'],
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
      book: {},
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
    registerEvents(){ },
    prepareGraph() {
      cytoscape.use(dagre);

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
        'documents/adjacent',
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
        eventHub.$emit('openBookPopup', null, null, node._private)
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
    openBookPopup(event){
        eventHub.$emit('openBookPopup', null, event);
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
    toggleClass(class_name, class_change){
      $('.'+class_name).toggleClass(class_change);
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
    if (this.book !== null){
        this.prepareGraph();
    }
  },
  created() {
    self = this;
    this.id = this.$route.params.id;
    this.book = JSON.parse(localStorage.getItem(this.id));
    eventHub.$emit('showHeader', false);
    eventHub.$emit('hideMenu', 3, false);
  },
  destroyed(){
    eventHub.$emit('hideMenu', 3, true);
  },
}
</script>

<style lang="scss">
  @import '../assets/css/variables';
  @import '../assets/css/media-queries';
  @import '../assets/css/app';
  @import '../assets/css/templatemo-style';
  @import '../assets/css/books';
</style>
