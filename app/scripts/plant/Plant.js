function Plant(){
  this.root = []; // The root plant node
}
Plant.prototype = {
  getMesh: function( mat ){
    return this.root.parse( this.ctx, mat );
  },
  setStartCtx: function( ctx ){
    this.ctx = ctx;
  }
};

module.exports = Plant;