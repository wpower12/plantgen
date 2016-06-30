var Plant       = require('./Plant');
var PELine      = require('./elements/PELine');
var PEPlane     = require('./elements/PEPlane');
var PNSymmetric = require('./elements/PNSymmetric');
var PNBranch    = require('./elements/PNBranch');
var PNTerminal  = require('./elements/PNTerminal');

var PMath = require('./PMath');
var Helper = new PMath();

var MAX_DEPTH = 7;
var MIN_EDGES = 1;
var MAX_EDGES = 5;
function PlantMaker(){

};
PlantMaker.prototype = {
  makePlant: function(){
      var plant = new Plant();
      plant.root = this.randomNode();
      this.addElements( plant.root, MAX_DEPTH );
      console.log(plant);
      return plant;
  },
  addElements: function( current_node, depth ){
    switch( current_node.type ){
      case 'n':
        this.addE_Edges( current_node, depth );
        break;
      case 'e':
        this.addE_Node( current_node, depth );
        break;
      case 's':
        this.addE_SingleEdge( current_node, depth );
        break;
      case 't':
        // Do nothing.
        break;
      default:
    }
  },
  addE_Edges: function( current_node, depth ){
    if( depth > 0 ){
      var r = Helper.randomInt(MIN_EDGES, MAX_EDGES);
      current_node.size = r;
      for( var c = 0; c < r; c++ ){
        current_node.children[c] = this.randomEdge( );
      }
      for( var c = 0; c < current_node.size; c++ ){
        this.addElements(current_node.children[c], depth-1);
      }
    }
  },
  addE_SingleEdge: function(current_node, depth){
    if( depth > 0 ){
      current_node.children[0] = this.randomEdge();
      current_node.size++;
      this.addElements( current_node.children[0], depth-1 );
    }
  },
  addE_Node: function( current_node, depth ){
    if( depth <= 0 ){
      var ret = new PNTerminal();
      ret.prm = {
        rad_delta: Helper.randomInt(2, 5)
      }
      current_node.children[0] = ret;
    } else {
      current_node.children[0] = this.randomNode();
      this.addElements(current_node.children[0], depth-1);
    }
  },
  randomEdge: function( ){
    var ret = new PELine( );
    // Set parameters
    ret.prm = {
      delta_theta: Helper.randomInt(0, 120),
      delta_phi:   Helper.randomInt(0, 250),
      delta_len:   Helper.randomInt(0, 50)
    };
    return ret;
  },
  randomNode: function() {
    // PNBranch or BNSymmertirc or PNTerminal
    var ret;
    switch( Helper.randomInt(0,7) ){
      case 0,1:
        ret = new PNSymmetric();
        ret.prm = {
          rad_delta: Helper.randomInt(0, 5),
          dx: Helper.randomFloat( 0, 1 ),
          dy: Helper.randomFloat( 0, 1 ),
          dz: Helper.randomFloat( 0, 1 ),
          count_delta: Helper.randomInt(0, 4)
        }
        break;
      case 2,3:
        ret = new PNTerminal();
        ret.prm = {
          rad_delta: Helper.randomInt(0, 5)
        }
        break;
      default:
        var ret = new PNBranch();
        ret.prm = {
          rad_delta: Helper.randomInt(0, 10)
        }
    }
    return ret;
  }
}

module.exports = PlantMaker;