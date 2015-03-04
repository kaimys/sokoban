'use strict';

// jshint browser:true
// jshint browserify:true

var THREE = require('three');
var loader = require('./loader');

var camera;
var scene;
var renderer;

var phi = 0;

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
  }

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

  loader.loadLevel(function(err, level) {
    if (err) {
      throw err;
    }
    window.level = level;
    level.addObjectsToScene(scene);
  });
}

function animate() {

  requestAnimationFrame(animate);

  //mesh.rotation.x += 0.01;
  //mesh.rotation.z += 0.02;
  camera.position.set(600 * Math.cos(phi) + 300, 600 * Math.sin(phi) + 300, 500);
  phi += 0.01;
  camera.updateProjectionMatrix();
  camera.lookAt(new THREE.Vector3(300, 300, 0));

  renderer.render(scene, camera);

}

window.addEventListener('load', function() {
  init();
  window.THREE = THREE;
  window.camera = camera;
  window.scene = scene;
  animate();
}, false);
