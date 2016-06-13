function PlantViewer( cnv ){
  this.camera = [];
  this.scene = [];
  this.renderer = [];
  this.mesh = [];
  this.rotation = 0;
  this.init( cnv );
};
PlantViewer.prototype = {
  init: function( c ){
    this.camera = new THREE.PerspectiveCamera( 70, 600 / 400, 1, 1000 );
    this.camera.position.z = 400;
    this.scene = new THREE.Scene();
    var p = {canvas : c };
    this.renderer = new THREE.WebGLRenderer(p);
    this.renderer.setClearColor( 0xeeeeee );
    this.renderer.setSize( 600, 400 );
    // Light
    var light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 1.5, 1, 1.5 );
		this.scene.add( light );
  },
  show: function( plant ){
    var texture = new THREE.TextureLoader().load( 'images/crate.gif' );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.anisotropy = 16;
		var material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide } );

    plant.parseToScene( this.scene, material );
    this.animate();
  },
  animate: function(){
    this.rotation += 0.025;
    this.camera.position.z = Math.sin(this.rotation) * 300;
    this.camera.position.x = Math.cos(this.rotation) * 300;
    this.camera.lookAt( this.scene.position )
    this.renderer.render( this.scene, this.camera );
    requestAnimationFrame( this.animate.bind(this) );
  }
}

module.exports = PlantViewer;