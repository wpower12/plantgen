function PMath(){}
PMath.prototype = {
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min + 0.0;
  },
  randomIntAC: function( start, delta, min, max ){
    var s = (start - delta) > min ? (start-delta) : min;
    var e = (start + delta) > max ? max : (start + delta);
    return this.randomInt( s, e );
  },
  randomFloat: function( min, max ){
    return Math.random() * (max - min) + min;
  },
  randomFloatAC: function( start, delta, min, max ){
    var s = (start - delta) > min ? (start-delta) : min;
    var e = (start + delta) > max ? max : (start + delta);
    return this.randomFloat( s, e );
  }
}
module.exports = PMath;