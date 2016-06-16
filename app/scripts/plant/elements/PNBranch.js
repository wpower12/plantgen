var PMath = require('../PMath');
var Helper = new PMath();

function PNBranch(  ){
  this.type = "n";
  this.size = 0;
  this.children = [];

  this.ctx = {
    rad: 5,
    count: 0
  };

  this.prm = {
    rad_delta: 0
  };
}
PNBranch.prototype = {
  parse: function( parent_ctx, s, m ){
    // var r = Helper.randomAboutClamped( this.ctx.rad, this.prm.rad_delta, 10, 30 );
    var r = parent_ctx.rad;
    var object = new THREE.Mesh( new THREE.SphereGeometry( r, 20, 10 ), m );
    object.position.set( parent_ctx.loc_end[0],
                         parent_ctx.loc_end[1],
                         parent_ctx.loc_end[2]);
    s.add( object )
    console.log("parsing branch: ", parent_ctx)
    for( var c = 0; c < this.size; c++ ){
      this.children[c].parse(parent_ctx, s, m);
    }
  }
}
module.exports = PNBranch;