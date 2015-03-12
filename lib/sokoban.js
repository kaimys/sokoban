'use strict';

var THREE = require('three');
var loader = require('./loader');

function Sokoban(window) {

  var width =  window.innerWidth;
  var height = window.innerHeight;
  var scene = new THREE.Scene();

  this.window = window;
  this.scene = scene;

  // Me
  this.me = null;
  this.dx = 0;
  this.dy = 0;

  // Camera
  this.ortographic = false;
  this.phi = -1.22;
  this.theta = 0.7;
  this.deltaPhi = 0;
  this.deltaTheta = 0;
  this.width = width;
  this.height = height;

  if (this.ortographic) {
    this.camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, -1000, 10000);
  } else {
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
  }
  this.camera.up.set(0, 0, 1);

  // adding lights
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
  light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
  light.position.set(200, 100, 500);
  scene.add(light);

  // Setup renderer
  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setSize(width, height);
  this.window.document.body.appendChild(this.renderer.domElement);
}

Sokoban.prototype.run = function() {
  var sokoban = this;

  function animate () {
    sokoban.window.requestAnimationFrame(animate);

    // Camera
    sokoban.camera.position.set(
        600 * Math.cos(sokoban.phi) * Math.cos(sokoban.theta) + 300,
        600 * Math.sin(sokoban.phi) * Math.cos(sokoban.theta) + 300,
        600 * Math.sin(sokoban.theta) );
    sokoban.phi += sokoban.deltaPhi;
    sokoban.theta += sokoban.deltaTheta;
    sokoban.camera.lookAt(new THREE.Vector3(300, 300, 0));

    // Me
    sokoban.me.move(sokoban.dx, sokoban.dy);

    sokoban.renderer.render(sokoban.scene, sokoban.camera);
  }

  loader.loadLevel(function(err, level) {
    if (err) {
      throw err;
    }
    level.addObjectsToScene(sokoban.scene);
    sokoban.level = level;
    sokoban.me = level.objectById.mrMesh;
    sokoban.window.level = level;
    sokoban.window.sokoban = sokoban;

    animate();
    sokoban.window.console.log('running');
  });
};

module.exports = Sokoban;
