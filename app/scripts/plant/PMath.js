function PMath(){}
PMath.prototype = {
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min +0.0;
  },
  randomAboutClamped: function( start, delta, min, max ){
    var s = (start - delta) > min ? (start-delta) : min;
    var e = (start + delta) > max ? max : (start + delta);
    return this.randomInt( s, e );
  }
}
module.exports = PMath;