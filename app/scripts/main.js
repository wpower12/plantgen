var PlantMaker  = require('./plant/PlantMaker');
var TestMaker   = require('./plant/TestMaker');
var PlantViewer = require('./plant/PlantViewer');
var GraphViewer = require('./plant/GraphViewer');

var maker  = new PlantMaker();
// var maker = new TestMaker();

var viewer = new PlantViewer( document.getElementById('screen') );
var graph  = new GraphViewer( );

var plantProcedure = maker.makePlant();

var ctx = {
  loc_start: [0,0,0],
  loc_end:   [0,0,0],
  theta: 90,
  phi: 0,
  len: 60,
  rad: 20,
  axis: new THREE.Vector3(0,1,0),
  count: 3
};

plantProcedure.setStartCtx( ctx );

viewer.show( plantProcedure );
viewer.animate();

graph.show( plantProcedure );


document.onkeydown = checkKey;
function checkKey( e ){
  e = e || window.event;
  if (e.keyCode == '32'){
    console.log('new individual.');
    viewer.clearScene();
    plantProcedure.setStartCtx( ctx );
    viewer.show( plantProcedure );
  } else if ( e.keyCode == '82' ){
    console.log('new procedure.');
    // viewer.clearScene();
    // plantProcedure = maker.makePlant();
    // graph.clearGraph();
    // viewer.show( plantProcedure );
    // graph.show( plantProcedure );
  }
}


