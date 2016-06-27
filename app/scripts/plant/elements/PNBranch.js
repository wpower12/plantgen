var PMath = require('../PMath');
var Helper = new PMath();

function PNBranch(  ){
  this.type = 'n';
  this.title1 = 'Branch';
  this.title2 = 'Node';
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
  parse: function( ctx, m ){
    var r = ctx.rad;
    var object = new THREE.Mesh( new THREE.SphereGeometry( r, 20, 10 ), m );
    object.position.set( ctx.loc_end[0],
                         ctx.loc_end[1],
                         ctx.loc_end[2]);
    ctx.loc_start = ctx.loc_end;
    var ret_geo = new THREE.Geometry();
    var c;
    for( c = 0; c < this.size; c++ ){
      var ctx_cpy = $.extend( true, {}, ctx );
      var cmesh = this.children[c].parse(ctx_cpy, m);
      cmesh.updateMatrix();
      ret_geo.merge( cmesh.geometry, cmesh.matrix );
    }
    object.updateMatrix();
    ret_geo.merge( object.geometry, object.matrix );
    return new THREE.Mesh(ret_geo, m);
  }
}
module.exports = PNBranch;