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
      plant.root = new PNBranch([0,0,0]);
      this.addElements( plant.root, MAX_DEPTH );
      return plant;
  },
  addElements: function( current_node, depth ){
    console.log("adding elements to: ", current_node);
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
        current_node.children[c] = this.randomEdge( current_node.loc );
        // var ch = current_node.children[c];
        // console.log("addEdge(s : e): ", ch.location_start, ch.location_end);
      }
      for( var c = 0; c < current_node.size; c++ ){
        this.addElements(current_node.children[c], depth-1);
      }
    }
  },
  addE_Node: function( current_node, depth ){
    if( depth > 0 ){
      current_node.children[0] = new PNBranch( current_node.location_end );
      this.addElements(current_node.children[0], depth-1);
    }
  },
  randomEdge: function( start_loc ){
    var length = Helper.randomInt(50, 100);
    var direction = [Helper.randomInt(1, 179),    // Theta
                     Helper.randomInt(1, 360)];   // Phi
    var ret = new PELine( start_loc, length, direction );
    return ret;
  }
}

module.exports = PlantMaker;