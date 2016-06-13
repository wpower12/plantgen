var PlantMaker  = require('./plant/PlantMaker');
var PlantViewer = require('./plant/PlantViewer')

var maker  = new PlantMaker();
var viewer = new PlantViewer( document.getElementById("screen") );

viewer.show( maker.makePlant() );
