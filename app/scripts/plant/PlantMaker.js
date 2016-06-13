var Plant = require('./Plant');
var PNode = require('./atomics/PNode');

function PlantMaker(){

};
PlantMaker.prototype = {
  makePlant: function(){
      var plant = new Plant();
      plant.root = new PNode([0,0,0]);
      var depth = 4;
      plant.root.addElements( depth );
      return plant;
  }
}

module.exports = PlantMaker;