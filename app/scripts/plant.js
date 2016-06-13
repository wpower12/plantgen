export default function(){
  console.log("FUCK WTF");
  var camera, scene, renderer;
	var mesh;
	init();
	animate();
	function init() {
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.z = 400;
		scene = new THREE.Scene();
		var texture = new THREE.TextureLoader().load( 'images/crate.gif' );
		var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
		var material = new THREE.MeshBasicMaterial( { map: texture } );
		mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );

    var c = document.getElementById('screen');
    var p = {canvas : c};
    renderer = new THREE.WebGLRenderer(p);

    renderer.setClearColor( 0xeeeeee );
		// renderer.setPixelRatio( window.devicePixelRatio );
		// renderer.setSize( window.innerWidth, window.innerHeight );

		// document.body.appendChild( renderer.domElement );
		//
		window.addEventListener( 'resize', onWindowResize, false );
	}
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}
	function animate() {
		requestAnimationFrame( animate );
		mesh.rotation.x += 0.005;
		mesh.rotation.y += 0.01;
		renderer.render( scene, camera );
	}
}