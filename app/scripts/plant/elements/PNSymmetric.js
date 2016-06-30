var PMath = require('../PMath');
var Helper = new PMath();

function PNSymmetric(){
  this.type = 's';
  this.title1 = 'Symmetric';
  this.title2 = 'Node';
  this.size = 0;
  this.children = []; // Will only have one?

  this.ctx = {
    rad: 5,
    count: 0,
    axis: []
  };
  this.prm = {
    rad_delta: 0,
    dx: 1,
    dy: 1,
    dz: 1,
    count_delta: 0
  };

}
PNSymmetric.prototype = {
  parse: function( ctx, m ){
    var r = ctx.rad;
    var object = new THREE.Mesh( new THREE.SphereGeometry( r, 20, 10 ), m );
    object.position.set( ctx.loc_end[0],
                         ctx.loc_end[1],
                         ctx.loc_end[2]);
    ctx.loc_start = ctx.loc_end;
    if( this.size > 0 ){
      // Update ctx
      ctx.axis = this.updateAxis( ctx.axis );

      var child_mesh = this.children[0].parse( ctx, m );
      var ret_geo = new THREE.Geometry();
      child_mesh.updateMatrix();
      ret_geo.merge( child_mesh.geometry, child_mesh.matrix );
      var delta = 2*Math.PI/(ctx.count+0.0);
      var theta;
      for( theta = delta; theta < 2*Math.PI; theta += delta){
        var child_copy = child_mesh.clone();
        var axis_cpy = $.extend( true, {}, ctx.axis );
        rotateAroundWorldAxis( child_copy, axis_cpy.add(object.position), theta );
        child_copy.updateMatrix();
        ret_geo.merge( child_copy.geometry, child_copy.matrix );
      }
      object.updateMatrix();
      ret_geo.merge( object.geometry, object.matrix );
      return new THREE.Mesh(ret_geo, m);
    } else {
      return object;
    }
  },
  updateAxis: function( axis ){
    axis.set( Helper.randomFloatAC( axis.x, this.prm.dx, -1, 1 ),
              Helper.randomFloatAC( axis.y, this.prm.dy, -1, 1 ),
              Helper.randomFloatAC( axis.z, this.prm.dz, -1, 1 ));
    axis.normalize();
    return axis;
  }
}


// Rotate an object around an arbitrary axis in world space
function rotateAroundWorldAxis(object, axis, radians) {
    var rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
}
module.exports = PNSymmetric;