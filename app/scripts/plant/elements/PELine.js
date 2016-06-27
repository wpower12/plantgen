var PMath = require('../PMath');
var Helper = new PMath();

function PELine( ){
  this.type = 'e';
  this.title1 = 'Line';
  this.title2 = 'Edge';
  this.children = [];
  this.ctx = {
    loc_start: 0,
    loc_end: 0,
    theta: 0,
    phi: 0,
    len: 0,
    rad: 0
  };
  this.prm = {
    delta_theta: 0,
    delta_phi: 0,
    delta_len: 0,
    delta_rad: 0
  };
}
PELine.prototype = {
  parse: function( ctx, m ){
    // Update the context
    ctx.loc_start = ctx.loc_end;
    ctx.theta = Helper.randomIntAC( ctx.theta,
                                    this.prm.delta_theta,
                                    1, 159 );
    ctx.phi   = Helper.randomIntAC( ctx.phi,
                                    this.prm.delta_phi,
                                    1, 355 );
    ctx.len   = Helper.randomIntAC( ctx.len,
                                    this.prm.delta_len,
                                    20, 80 );
    ctx.rad   = Helper.randomIntAC( ctx.rad,
                                    this.prm.delta_phi,
                                    5, 15 );
    ctx.loc_end = calcEndLoc( ctx.loc_start,
                              ctx.len ,
                             [ctx.theta, ctx.phi]);
    var cyl_mesh = getCylinderMesh( ctx.loc_start,
                                    ctx.loc_end,
                                    ctx.rad,
                                    m );
    var c_mesh = this.children[0].parse( ctx, m );
    var ret_geo = new THREE.Geometry();
    cyl_mesh.updateMatrix();
    ret_geo.merge( cyl_mesh.geometry, cyl_mesh.matrix );
    c_mesh.updateMatrix();
    ret_geo.merge( c_mesh.geometry, c_mesh.matrix );
    return new THREE.Mesh( ret_geo, m );
  }
}

function calcEndLoc( s, r, d ){
  var dx, dy, dz;
  var theta = d[0]*Math.PI/180.0;
  var phi   = d[1]*Math.PI/180.0;
  dz = r*Math.sin(theta)*Math.cos(phi);
  dx = r*Math.sin(phi);
  dy = r*Math.sin(theta)*Math.sin(phi);
  return [ s[0]+dx, s[1]+dy, s[2]+dz ];
}

function getCylinderMesh( loc_1, loc_2, r, mat ){
  var point1 = new THREE.Vector3( loc_1[0],
                                  loc_1[1],
                                  loc_1[2]);
  var point2 = new THREE.Vector3( loc_2[0],
                                  loc_2[1],
                                  loc_2[2]);
  var d = point1.distanceTo(point2);
  var g = new THREE.CylinderGeometry( r, r, d );
  g.applyMatrix( new THREE.Matrix4().makeTranslation( 0,
                                                      d / 2,
                                                      0 ) );
  g.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
  var object = new THREE.Mesh( g, mat );
  object.position.set( point1.x,point1.y,point1.z );
  object.lookAt( point2 );
  return object;
}

module.exports = PELine;