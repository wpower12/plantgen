function Plant(){
  this.root = []; // The root plant node
  this.ctx  = []; // The ctx used to start off an individual parse
}
Plant.prototype = {
  getMesh: function( mat ){
    return this.root.parse( this.ctx, mat );
  },
  setStartCtx: function( ctx ){
  	var ctx_cpy = $.extend( true, {}, ctx );
    this.ctx = ctx_cpy;
  }
};

module.exports = Plant;