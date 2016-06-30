var Plant       = require('./Plant');
var PELine      = require('./elements/PELine');
var PEPlane     = require('./elements/PEPlane');
var PNSymmetric = require('./elements/PNSymmetric');
var PNBranch    = require('./elements/PNBranch');
var PNTerminal  = require('./elements/PNTerminal');

var PMath = require('./PMath');
var Helper = new PMath();

var MAX_DEPTH = 4;
var MIN_EDGES = 1;
var MAX_EDGES = 5;
function TestMaker(){

};
TestMaker.prototype = {
  makePlant: function(){
    return this.makeComplex();
    // return this.makeSimpleSym();
    // return this.makeTestSimpleBranch();
  },
  makeSimpleSym: function(){
    var plant = new Plant();
    var nodePrm = {
      rad_delta: Helper.randomInt(0, 0),
      count_delta: Helper.randomInt(0, 3)
    }

    var NA = new PNSymmetric();
    NA.prm = nodePrm;  
    var EA = this.zeroEdge();
    var NB = new PNTerminal();

    EA.children[0] = NB;
    EA.size = 1;

    NA.children[0] = EA;
    NA.size = 1;

    plant.root = NA;
    return plant;
  },
  makeTestSimpleBranch(){
    var plant = new Plant();
    var nodePrm = {
      rad_delta: Helper.randomInt(0, 0),
      dx: Helper.randomFloat( 0, 1 ),
      dy: Helper.randomFloat( 0, 1 ),
      dz: Helper.randomFloat( 0, 1 ),
      count_delta: Helper.randomInt(0, 3)
    }
    plant.root = new PNBranch();
    plant.root.size++;
    plant.root.prm = nodePrm;
    var EA = this.randomEdge();
    var NA = new PNTerminal();
    EA.children[0] = NA;
    EA.size++;
    plant.root.children[0] = EA;
    return plant;
  },
  makeComplex: function(){
      var plant = new Plant();

      var nodePrm = {
        rad_delta: Helper.randomInt(2, 5),
        dx: Helper.randomFloat( 0, 1 ),
        dy: Helper.randomFloat( 0, 1 ),
        dz: Helper.randomFloat( 0, 1 ),
        count_delta: Helper.randomInt(0, 3)
      }
      plant.root = new PNBranch();
      plant.root.prm = nodePrm;
      var EA = this.randomEdge();
      var NA = new PNSymmetric();
      NA.prm = nodePrm;
      var EB = this.randomEdge();
      var NB = new PNBranch();
      NB.prm = nodePrm;

      var EC, NC;
      var COUNT = 3;
      var i;
      for( i = 0; i < COUNT; i++ ){
        EC = this.randomEdge();
        NC = new PNTerminal();
        EC.children[0] = NC;
        NB.children[i] = EC;
        NB.size++;
      }
      EB.children[0] = NB;
      NA.children[0] = EB;
      NA.size++;
      EA.children[0] = NA;
      plant.root.children[0] = EA;
      plant.root.size++;
      console.log(plant);
      return plant;
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
  zeroEdge: function(){
    var ret = new PELine( );
    // Set parameters
    ret.prm = {
      delta_theta: Helper.randomInt(0, 1),
      delta_phi:   Helper.randomInt(0, 1),
      delta_len:   Helper.randomInt(0, 1),
      delta_rad:   Helper.randomInt(0, 1)
    };
    return ret;
    
  }
}

module.exports = TestMaker;