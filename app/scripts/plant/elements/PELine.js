var PMath = require('../PMath');
var Helper = new PMath();

function PELine( ){
  this.type = "e";
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
  parse: function( input_ctx, s, m ){
    // Update the context
    this.ctx = {
      loc_start: input_ctx.loc_end,
      loc_end: 0,   // Calculated later
      theta: Helper.randomAboutClamped( input_ctx.theta,
                                        this.prm.delta_theta,
                                        1, 159 ),
      phi:   Helper.randomAboutClamped( input_ctx.phi,
                                        this.prm.delta_phi,
                                        1, 355 ),
      len:   Helper.randomAboutClamped( input_ctx.len,
                                        this.prm.delta_len,
                                        20, 80 ),
      rad:   Helper.randomAboutClamped(  input_ctx.rad,
                                        this.prm.delta_phi,
                                        5, 15 )
    }
    this.ctx.loc_end = calcEndLoc( this.ctx.loc_start,
                                   this.ctx.len ,
                                  [this.ctx.theta, this.ctx.phi]);
    drawCylinder( this.ctx.loc_start,
                  this.ctx.loc_end,
                  this.ctx.rad,
                  s, m );
    this.children[0].parse( this.ctx, s, m);
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

function drawCylinder( loc_1, loc_2, r, scene, mat ){
  var point1 = new THREE.Vector3( loc_1[0],
                                  loc_1[1],
                                  loc_1[2]);
  var point2 = new THREE.Vector3( loc_2[0],
                                  loc_2[1],
                                  loc_2[2]);
  // Create Geometry
  var d = point1.distanceTo(point2);
  var g = new THREE.CylinderGeometry( r, r, d );
  g.applyMatrix( new THREE.Matrix4().makeTranslation( 0,
                                                      d / 2,
                                                      0 ) );
  g.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
  var object = new THREE.Mesh( g, mat );
  object.position.set( point1.x,point1.y,point1.z );
  object.lookAt( point2 );
  scene.add( object );
}

module.exports = PELine;