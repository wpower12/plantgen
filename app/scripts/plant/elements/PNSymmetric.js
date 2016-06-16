var PMath = require('../PMath');
var Helper = new PMath();

function PNSymmetric(){
  this.type = "n";
  this.size = 0;
  this.children = [];

  this.ctx = {
    rad: 5,
    count: 0
  };

  this.prm = {
    rad_delta: 0,
    count_delta: 0
  };

}
PNSymmetric.prototype = {

}
module.exports = PNSymmetric;