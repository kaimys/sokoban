'use strict';

// jshint browser:true
// jshint browserify:true

var THREE = require('three');

var camera;
var scene;
var renderer;
var geometry;
var mesh;

var phi = 0;
var level = [
  {x: 1, y: 1, t: 'floor'},
  {x: 2, y: 1, t: 'floor'},
  {x: 3, y: 1, t: 'floor'},
  {x: 1, y: 2, t: 'floor'},
  {x: 2, y: 2, t: 'floor'},
  {x: 3, y: 2, t: 'floor'},
  {x: 5, y: 2, t: 'floor'},
  {x: 6, y: 2, t: 'floor'},
  {x: 2, y: 3, t: 'floor'},
  {x: 3, y: 3, t: 'target'},
  {x: 5, y: 3, t: 'floor'},
  {x: 6, y: 3, t: 'floor'},
  {x: 1, y: 4, t: 'floor'},
  {x: 2, y: 4, t: 'floor'},
  {x: 3, y: 4, t: 'floor'},
  {x: 4, y: 4, t: 'floor'},
  {x: 5, y: 4, t: 'floor'},
  {x: 6, y: 4, t: 'floor'},
  {x: 1, y: 5, t: 'floor'},
  {x: 2, y: 5, t: 'floor'},
  {x: 1, y: 6, t: 'floor'},
  {x: 2, y: 6, t: 'floor'},
];

var matFloorOpts = {
  ambient: 0x8888ff, color: 0x5577ff, specular: 0x6666ff,
  shininess: 5, shading: THREE.FlatShading
};

var matTargetOpts = {
  ambient: 0x8888ff, color: 0x7777ff, specular: 0x6666ff,
  shininess: 20, shading: THREE.FlatShading
};

var matBoxOpts = {
  ambient: 0x505050, color: 0xbb9988, specular: 0x003300,
  shininess: 10, shading: THREE.FlatShading
};

var matMrMeshOpts = {
  ambient: 0x606060, color: 0xeebbee, specular: 0x009900,
  shininess: 60, shading: THREE.FlatShading
};

function init() {

  scene = new THREE.Scene();

  var width =  window.innerWidth;
  var height = window.innerHeight;
  if (true) {
    camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
    camera.up.set(0, 0, 1);
  } else {
    camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, -1000, 10000);
    camera.position.set(0, 300, 1000);
    //camera.lookAt(0, 0, 0);
  }

  //geometry = new THREE.BoxGeometry( 100, 100, 100 );
  geometry = new THREE.PlaneGeometry(100, 100);
  var material = new THREE.MeshPhongMaterial(matFloorOpts);
  var materialTarget = new THREE.MeshPhongMaterial(matTargetOpts);

  for (var i = 0; i < level.length; i++) {
    if (level[i].t === 'target') {
      mesh = new THREE.Mesh(geometry, materialTarget);
    } else {
      mesh = new THREE.Mesh(geometry, material);
    }
    mesh.position.set(level[i].x * 100 - 300, level[i].y * 100 - 300, 0);
    scene.add(mesh);

  }

  var loader = new THREE.JSONLoader();
  loader.load('geometry/box.json', function(geo) {
    var materialBox = new THREE.MeshPhongMaterial(matBoxOpts);
    mesh = new THREE.Mesh(geo, materialBox);
    mesh.scale.set(30, 30, 30);
    mesh.rotation.x += 1.57;
    mesh.position.set(200, 0, 40);
    scene.add(mesh);
  });

  loader.load('geometry/mr_mesh.json', function(geo) {
    var materialMrMesh = new THREE.MeshPhongMaterial(matMrMeshOpts);
    mesh = new THREE.Mesh(geo, materialMrMesh);
    mesh.scale.set(80, 80, 80);
    mesh.rotation.x -= 1.57;
    mesh.position.set(-100, 0, 80);
    scene.add(mesh);
  });

  var light = new THREE.AmbientLight(0x606060);
  scene.add(light);

  light = new THREE.PointLight(0xffbbbb, 0.5);
  light.position.set(-300, -300, 500);
  scene.add(light);
  light = new THREE.PointLight(0xbbbbff, 0.5);
  light.position.set(300, -300, 500);
  scene.add(light);
  light = new THREE.PointLight(0xbbffbb, 0.5);
  light.position.set(0, 300, 500);
  scene.add(light);

  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
  //hemiLight.color.setHSL(0.6, 1, 0.6);
  //hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  hemiLight.position.set(200, 100, 500);
  scene.add(hemiLight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
}

function animate() {

  requestAnimationFrame(animate);

  //mesh.rotation.x += 0.01;
  //mesh.rotation.z += 0.02;
  camera.position.set(600 * Math.cos(phi), 600 * Math.sin(phi), 500);
  phi += 0.01;
  camera.updateProjectionMatrix();
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer.render(scene, camera);

}

window.addEventListener('load', function() {
  init();
  window.THREE = THREE;
  window.camera = camera;
  window.geometry = geometry;
  window.mesh = mesh;
  window.scene = scene;
  animate();
}, false);
