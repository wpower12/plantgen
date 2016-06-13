// For now a node is just a sphere at a point.  Making the
// following assumptions:
//
//  - Spheres are located centered about their position.
// var PEdge = require('./PEdge');
var PMath = require('./PMath');
var Helper = new PMath();

function PNode( l ){
  this.loc = l;
  this.size = 0;
  this.children = [];
}
PNode.prototype = {
  parse: function( s, m ){
    // Add this to the scene
    var object = new THREE.Mesh( new THREE.SphereGeometry( 10, 20, 10 ), m );
    object.position.set(this.loc[0],this.loc[1],this.loc[2]);
    s.add( object )

    // Call parse on all children
    for( var c = 0; c < this.size; c++ ){
      this.children[c].parse(s, m);
    }
  },
  addElements: function( depth ){
    if( depth > 0 ){
      var r = Helper.randomInt(1, 4);
      // var r = 2;
      this.size = r;
      for( var c = 0; c < r; c++ ){
        this.children[c] = this.randomEdge( this.loc );
        var ch = this.children[c];
        console.log("addEdge(s : e): ", ch.location_start, ch.location_end);
      }
      // For each child, call addElements
      for( var c = 0; c <r; c++ ){
        this.children[c].addElements(depth-1);
      }
    }
  },
  randomEdge: function( start_loc ){
    // Pick random length and direction
    var length = Helper.randomInt(50, 100);
    var direction = [Helper.randomInt(1, 179),    // Theta
                     Helper.randomInt(1, 360)];   // Phi
    var ret = new PEdge( start_loc, length, direction );
    return ret;
  }
}

function PEdge( loc_start, l, dir ){
  this.location_start = loc_start;
  this.length = l;
  this.direction = dir;
  this.children = [];

  // Calculate End Point - Trig!
  this.location_end = calcEndLoc(loc_start, l , dir);
}
PEdge.prototype = {
  parse: function( s, m ){
    var p_end   = new THREE.Vector3( this.location_end[0],
                                     this.location_end[1],
                                     this.location_end[2]);
    var p_start = new THREE.Vector3( this.location_start[0],
                                     this.location_start[1],
                                     this.location_start[2]);
    drawCylinder( p_end, p_start, s, m );
    this.children[0].parse(s, m);
  },
  addElements: function( depth ){
    if( depth > 0 ){
      this.children[0] = new PNode( this.location_end );
      this.children[0].addElements(depth-1);
    }
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

module.exports = PNode;
