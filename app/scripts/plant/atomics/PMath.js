var PNode = require('./PNode');

function PMath(){}
PMath.prototype = {
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min +0.0;
  }
}
module.exports = PMath;