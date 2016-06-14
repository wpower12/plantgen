function PELine( loc_start, l, dir ){
  this.type = "e";
  this.location_start = loc_start;
  this.length = l;
  this.direction = dir;
  this.children = [];

  // Calculate End Point - Trig!
  this.location_end = calcEndLoc(loc_start, l , dir);
}
PELine.prototype = {
  parse: function( s, m ){
    var p_end   = new THREE.Vector3( this.location_end[0],
                                     this.location_end[1],
                                     this.location_end[2]);
    var p_start = new THREE.Vector3( this.location_start[0],
                                     this.location_start[1],
                                     this.location_start[2]);
    drawCylinder( p_end, p_start, s, m );
    this.children[0].parse(s, m);
  }
}

function calcEndLoc( s, r, d ){
  var dx, dy, dz;
  var theta = d[0]*Math.PI/180.0;
  var phi   = d[1]*Math.PI/180.0;
  dx = r*Math.sin(theta)*Math.cos(phi);
  dz = r*Math.sin(phi);
  dy = r*Math.sin(theta)*Math.sin(phi);
  return [ s[0]+dx, s[1]+dy, s[2]+dz ];
}

function drawCylinder( point1, point2, scene, mat ){
  // Create Geometry
  var d = point1.distanceTo(point2);
  console.log(d);
  var g = new THREE.CylinderGeometry( 5, 5, d );
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