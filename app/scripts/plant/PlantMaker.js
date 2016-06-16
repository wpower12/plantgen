var Plant       = require('./Plant');
var PELine      = require('./elements/PELine');
var PEPlane     = require('./elements/PEPlane');
var PNSymmetric = require('./elements/PNSymmetric');
var PNBranch    = require('./elements/PNBranch');

var PMath = require('./PMath');
var Helper = new PMath();

var MAX_DEPTH = 4;
var MIN_EDGES = 1;
var MAX_EDGES = 5;
function PlantMaker(){

};
PlantMaker.prototype = {
  makePlant: function(){
      var plant = new Plant();
      plant.root = new PNBranch();
      this.addElements( plant.root, MAX_DEPTH );
      return plant;
  },
  addElements: function( current_node, depth ){
    switch( current_node.type ){
      case "n":
        this.addE_Edges( current_node, depth );
        break;
      case "e":
        this.addE_Node( current_node, depth );
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
  addE_Node: function( current_node, depth ){
    if( depth > 0 ){
      current_node.children[0] = new PNBranch( );
      this.addElements(current_node.children[0], depth-1);
    }
  },
  randomEdge: function( ){
    var ret = new PELine( );
    // Set parameters
    ret.prm = {
      delta_theta: Helper.randomInt(5, 120),
      delta_phi:   Helper.randomInt(5, 250),
      delta_len:   Helper.randomInt(5, 100),
      delta_rad:   Helper.randomInt(5, 10)
    };
    return ret;
  },
  randomNode: function() {
    var ret = new PNBranch();
    ret.prm = {
      rad_delta: Helper.randomInt(5, 10)
    }
  }
}

module.exports = PlantMaker;