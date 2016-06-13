function Plant(){
  this.root = []; // The root plant node
}
Plant.prototype = {
  parseToScene: function( s, m ){
    this.root.parse( s, m );
  }
};

module.exports = Plant;