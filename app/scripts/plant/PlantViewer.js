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
    this.camera = new THREE.PerspectiveCamera( 70, 800 / 400, 1, 1000 );
    this.camera.position.z = 400;
    this.scene = new THREE.Scene();
    var p = {canvas : c };
    this.renderer = new THREE.WebGLRenderer(p);
    this.renderer.setClearColor( 0xeeeeee );
    this.renderer.setSize( 800, 400 );

  },
  show: function( plant ){
    var texture = new THREE.TextureLoader().load( 'images/crate.gif' );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.anisotropy = 16;
		var material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide } );
    var pmesh = plant.getMesh( material );

    this.centerMesh( pmesh );
    this.scene.add( pmesh );
    this.updateLights();
  },
  animate: function(){
    this.rotation += 0.0025;
    this.camera.position.z = Math.sin(this.rotation) * 400;
    this.camera.position.x = Math.cos(this.rotation) * 400;
    this.camera.lookAt( this.scene.position )
    this.renderer.render(  this.scene, this.camera );
    requestAnimationFrame( this.animate.bind(this) );
  },
  clearScene: function(){
    for( var i = this.scene.children.length - 1; i >= 0; i-- ){
      var obj = this.scene.children[i];
      this.scene.remove(obj);
    }
  },
  centerMesh: function( obj ){
    obj.geometry.computeBoundingBox();
    console.log(obj.geometry.boundingBox);
    var centerX = 0.5 * ( obj.geometry.boundingBox.max.x + obj.geometry.boundingBox.min.x );
    var centerY = 0.5 * ( obj.geometry.boundingBox.max.y + obj.geometry.boundingBox.min.y );
    var centerZ = 0.5 * ( obj.geometry.boundingBox.max.z + obj.geometry.boundingBox.min.z );

    var v = new THREE.Vector3( centerX, centerY, centerZ );
    obj.position.sub(v);
    obj.updateMatrix();
  },
  updateLights: function(){
    var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
		light.position.set( 1, 0, 0 );
		this.scene.add( light );
    light = new THREE.DirectionalLight( 0xffffff, 0.25 );
    light.position.set( 0.5, -1, -1 );
		this.scene.add( light );
    light = new THREE.DirectionalLight( 0xeeeeee, 0.5 );
    light.position.set( 0, 0, 1 );
		this.scene.add( light );
  }
}

module.exports = PlantViewer;