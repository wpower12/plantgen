var PMath = require('../PMath');
var Helper = new PMath();

function PNTerminal(){
  this.type = 't';
  this.title1 = 'Terminal';
  this.title2 = 'Node';
  this.size = 0;
  this.children = [];

}
PNTerminal.prototype = {
  parse: function( ctx, m ){
    var r = ctx.rad;
    var object = new THREE.Mesh( new THREE.SphereGeometry( r, 20, 10 ), m );
    object.position.set( ctx.loc_end[0],
                         ctx.loc_end[1],
                         ctx.loc_end[2]);

    object.updateMatrix();
    return object;
  }
}

module.exports = PNTerminal;