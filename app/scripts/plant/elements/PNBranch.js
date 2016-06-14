function PNBranch( l ){
  this.type = "n";
  this.loc = l;
  this.size = 0;
  this.children = [];
}
PNBranch.prototype = {
  parse: function( s, m ){
    // Add this to the scene
    var object = new THREE.Mesh( new THREE.SphereGeometry( 10, 20, 10 ), m );
    object.position.set(this.loc[0],this.loc[1],this.loc[2]);
    s.add( object )

    // Call parse on all children
    for( var c = 0; c < this.size; c++ ){
      this.children[c].parse(s, m);
    }
  }
}
module.exports = PNBranch;