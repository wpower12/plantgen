!function e(t,n,r){function a(i,s){if(!n[i]){if(!t[i]){var d="function"==typeof require&&require;if(!s&&d)return d(i,!0);if(o)return o(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var h=n[i]={exports:{}};t[i][0].call(h.exports,function(e){var n=t[i][1][e];return a(n?n:e)},h,h.exports,e,t,n,r)}return n[i].exports}for(var o="function"==typeof require&&require,i=0;i<r.length;i++)a(r[i]);return a}({1:[function(e,t,n){function r(e){e=e||window.event,"32"==e.keyCode?(console.log("new procedure."),s.clearScene(),s.show(d)):"82"==e.keyCode&&(console.log("new individual."),s.clearScene(),d=i.makePlant(),s.show(d))}var a=e("./plant/PlantMaker"),o=(e("./plant/TestMaker"),e("./plant/PlantViewer")),i=new a,s=new o(document.getElementById("screen")),d=i.makePlant();s.show(d),s.animate(),document.onkeydown=r},{"./plant/PlantMaker":4,"./plant/PlantViewer":5,"./plant/TestMaker":6}],2:[function(e,t,n){function r(){}r.prototype={randomInt:function(e,t){return Math.floor(Math.random()*(t-e))+e+0},randomIntAC:function(e,t,n,r){var a=e-t>n?e-t:n,o=e+t>r?r:e+t;return this.randomInt(a,o)},randomFloat:function(e,t){return Math.random()*(t-e)+e},randomFloatAC:function(e,t,n,r){var a=e-t>n?e-t:n,o=e+t>r?r:e+t;return this.randomFloat(a,o)}},t.exports=r},{}],3:[function(e,t,n){function r(){this.root=[]}r.prototype={getMesh:function(e){return start_ctx={loc_start:[0,0,0],loc_end:[0,0,0],theta:10,phi:10,len:50,rad:3,axis:new THREE.Vector3(1,0,0),count:3},this.root.parse(start_ctx,e)}},t.exports=r},{}],4:[function(e,t,n){function r(){}var a=e("./Plant"),o=e("./elements/PELine"),i=(e("./elements/PEPlane"),e("./elements/PNSymmetric")),s=e("./elements/PNBranch"),d=e("./PMath"),c=new d,h=8,l=1,m=5;r.prototype={makePlant:function(){var e=new a;return e.root=this.randomNode(),this.addElements(e.root,h),e},addElements:function(e,t){switch(e.type){case"n":this.addE_Edges(e,t);break;case"e":this.addE_Node(e,t);break;case"s":this.addE_SingleEdge(e,t)}},addE_Edges:function(e,t){if(t>0){var n=c.randomInt(l,m);e.size=n;for(var r=0;n>r;r++)e.children[r]=this.randomEdge();for(var r=0;r<e.size;r++)this.addElements(e.children[r],t-1)}},addE_SingleEdge:function(e,t){t>0&&(e.children[0]=this.randomEdge(),e.size++,this.addElements(e.children[0],t-1))},addE_Node:function(e,t){e.children[0]=this.randomNode(),this.addElements(e.children[0],t-1)},randomEdge:function(){var e=new o;return e.prm={delta_theta:c.randomInt(5,120),delta_phi:c.randomInt(5,250),delta_len:c.randomInt(5,100),delta_rad:c.randomInt(5,10)},e},randomNode:function(){var e;switch(c.randomInt(0,5)){case 0:e=new i,e.prm={rad_delta:c.randomInt(2,5),dx:c.randomFloat(0,1),dy:c.randomFloat(0,1),dz:c.randomFloat(0,1),count_delta:c.randomInt(0,3)};break;default:var e=new s;e.prm={count_delta:c.randomInt(0,4),rad_delta:c.randomInt(2,15)}}return e}},t.exports=r},{"./PMath":2,"./Plant":3,"./elements/PELine":7,"./elements/PEPlane":8,"./elements/PNBranch":9,"./elements/PNSymmetric":10}],5:[function(e,t,n){function r(e){this.camera=[],this.scene=[],this.renderer=[],this.mesh=[],this.rotation=0,this.init(e)}r.prototype={init:function(e){this.camera=new THREE.PerspectiveCamera(70,1.5,1,1e3),this.camera.position.z=400,this.scene=new THREE.Scene;var t={canvas:e};this.renderer=new THREE.WebGLRenderer(t),this.renderer.setClearColor(15658734),this.renderer.setSize(600,400);var n=new THREE.DirectionalLight(16777215,.75);n.position.set(1,0,0),this.scene.add(n),n=new THREE.DirectionalLight(16777215,.25),n.position.set(.5,-1,-1),this.scene.add(n),n=new THREE.DirectionalLight(15658734,.5),n.position.set(0,0,1),this.scene.add(n)},show:function(e){var t=(new THREE.TextureLoader).load("images/crate.gif");t.wrapS=t.wrapT=THREE.RepeatWrapping,t.anisotropy=16;var n=new THREE.MeshLambertMaterial({map:t,side:THREE.DoubleSide}),r=e.getMesh(n);this.centerMesh(r),this.scene.add(r)},animate:function(){this.rotation+=.0025,this.camera.position.z=400*Math.sin(this.rotation),this.camera.position.x=400*Math.cos(this.rotation),this.camera.lookAt(this.scene.position),this.renderer.render(this.scene,this.camera),requestAnimationFrame(this.animate.bind(this))},clearScene:function(){for(var e=this.scene.children.length-1;e>=0;e--){var t=this.scene.children[e];this.scene.remove(t)}},centerMesh:function(e){e.geometry.computeBoundingBox(),console.log(e.geometry.boundingBox);var t=.5*(e.geometry.boundingBox.max.x+e.geometry.boundingBox.min.x),n=.5*(e.geometry.boundingBox.max.y+e.geometry.boundingBox.min.y),r=.5*(e.geometry.boundingBox.max.z+e.geometry.boundingBox.min.z),a=new THREE.Vector3(t,n,r);e.position.sub(a),e.updateMatrix()}},t.exports=r},{}],6:[function(e,t,n){},{}],7:[function(e,t,n){function r(){this.type="e",this.children=[],this.ctx={loc_start:0,loc_end:0,theta:0,phi:0,len:0,rad:0},this.prm={delta_theta:0,delta_phi:0,delta_len:0,delta_rad:0}}function a(e,t,n){var r,a,o,i=n[0]*Math.PI/180,s=n[1]*Math.PI/180;return o=t*Math.sin(i)*Math.cos(s),r=t*Math.sin(s),a=t*Math.sin(i)*Math.sin(s),[e[0]+r,e[1]+a,e[2]+o]}function o(e,t,n,r){var a=new THREE.Vector3(e[0],e[1],e[2]),o=new THREE.Vector3(t[0],t[1],t[2]),i=a.distanceTo(o),s=new THREE.CylinderGeometry(n,n,i);s.applyMatrix((new THREE.Matrix4).makeTranslation(0,i/2,0)),s.applyMatrix((new THREE.Matrix4).makeRotationX(Math.PI/2));var d=new THREE.Mesh(s,r);return d.position.set(a.x,a.y,a.z),d.lookAt(o),d}var i=e("../PMath"),s=new i;r.prototype={parse:function(e,t){e.loc_start=e.loc_end,e.theta=s.randomIntAC(e.theta,this.prm.delta_theta,1,159),e.phi=s.randomIntAC(e.phi,this.prm.delta_phi,1,355),e.len=s.randomIntAC(e.len,this.prm.delta_len,20,80),e.rad=s.randomIntAC(e.rad,this.prm.delta_phi,5,15),e.loc_end=a(e.loc_start,e.len,[e.theta,e.phi]);var n=o(e.loc_start,e.loc_end,e.rad,t),r=this.children[0].parse(e,t),i=new THREE.Geometry;return n.updateMatrix(),i.merge(n.geometry,n.matrix),r.updateMatrix(),i.merge(r.geometry,r.matrix),new THREE.Mesh(i,t)}},t.exports=r},{"../PMath":2}],8:[function(e,t,n){},{}],9:[function(e,t,n){},{}],10:[function(e,t,n){function r(){this.type="s",this.size=0,this.children=[],this.ctx={rad:5,count:0,axis:[]},this.prm={rad_delta:0,dx:1,dy:1,dz:1,count_delta:0}}function a(e,t,n){var r=new THREE.Matrix4;r.makeRotationAxis(t.normalize(),n),e.matrix.multiply(r),e.rotation.setFromRotationMatrix(e.matrix)}var o=e("../PMath");new o;r.prototype={parse:function(e,t){var n=e.rad,r=new THREE.Mesh(new THREE.SphereGeometry(n,20,10),t);if(r.position.set(e.loc_end[0],e.loc_end[1],e.loc_end[2]),e.loc_start=e.loc_end,this.size>0){e.axis=this.updateAxis(e.axis);var o=this.children[0].parse(e,t),i=new THREE.Geometry;i.merge(o.geometry,o.matrix);var s,d=2*Math.PI/(e.count+0);for(s=d;s<=2*Math.PI;s+=d){var c=o.clone();a(c,r.position.add(e.axis),s),c.updateMatrix(),i.merge(c.geometry,c.matrix)}return r.updateMatrix(),i.merge(r.geometry,r.matrix),new THREE.Mesh(i,t)}return r},updateAxis:function(e){return e}},t.exports=r},{"../PMath":2}]},{},[1]);