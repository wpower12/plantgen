function Plant(){
  this.root = []; // The root plant node
}
Plant.prototype = {
  parseToScene: function( s, m ){
    // this.root.parse( s, m );

    start_ctx = {
      loc_start: [0,0,0],
      loc_end:   [0,0,0],
      theta: 1,
      phi: 1,
      len: 20,
      rad: 5
    };
    this.root.parse( start_ctx, s, m );
  }
};

module.exports = Plant;