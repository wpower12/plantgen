function PTerminal(){
  this.size = 0;
  this.type = "";
  this.children = []; // Unused
}
PTerminal.prototype = {
  parse: function( s, m ){
    // Add this to the scene
    var object = new THREE.Mesh( new THREE.TorusGeometry( 50, 20, 20, 20 ), m );
    object.position.set(0,0,0);
    s.add( object )
  },
  addElements: function( depth ){
    // Do nothing. Youre a terminal
  }
}
module.exports = PTerminal;