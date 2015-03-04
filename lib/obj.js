'use strict';

var THREE = require('three');

/**
 * Base class for all objects
 * @constructor
 */
function Base() {
}

Base.prototype.moveTo = function(x, y) {
  this.mesh.position.x = 100 * x;
  this.mesh.position.y = 100 * y;
};

/**
 * The box to push around
 * @param x
 * @param y
 * @constructor
 */
function Box(x, y) {
  Base.apply(this, arguments);
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.scale.set(30, 30, 30);
  this.mesh.rotation.x += 1.57;
  this.mesh.position.set(100 * x, 100 * y, 40);
}

Box.prototype = new Base();

Box.prototype.material = new THREE.MeshPhongMaterial({
  ambient: 0x505050, color: 0xbb9988, specular: 0x003300,
  shininess: 10, shading: THREE.FlatShading
});

/**
 * Mr Mesh, the guy who pushes the box
 * @param x
 * @param y
 * @constructor
 */
function MrMesh(x, y) {
  Base.apply(this, arguments);
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.scale.set(80, 80, 80);
  this.mesh.rotation.x -= 1.57;
  this.mesh.position.set(100 * x, 100 * y, 80);
}

MrMesh.prototype = new Base();

MrMesh.prototype.material = new THREE.MeshPhongMaterial({
  ambient: 0x606060, color: 0xeebbee, specular: 0x009900,
  shininess: 60, shading: THREE.FlatShading
});

/**
 * A normal floor tile
 * @constructor
 */
function Floor(x, y) {
  Base.apply(this, arguments);
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.position.set(100 * x, 100 * y, 0);
}

Floor.prototype = new Base();

Floor.prototype.geometry = new THREE.PlaneGeometry(100, 100);

Floor.prototype.material = new THREE.MeshPhongMaterial({
  ambient: 0x8888ff, color: 0x5577ff, specular: 0x6666ff,
  shininess: 5, shading: THREE.FlatShading
});

/**
 * The tile where Mr Mesh should move his box to
 * @constructor
 */
function Target(x, y) {
  Base.apply(this, arguments);
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.position.set(100 * x, 100 * y, 0);
}

Target.prototype = new Base();

Target.prototype.geometry = new THREE.PlaneGeometry(100, 100);

Target.prototype.material = new THREE.MeshPhongMaterial({
  ambient: 0x8888ff, color: 0x7777ff, specular: 0x6666ff,
  shininess: 20, shading: THREE.FlatShading
});

module.exports = {
  Box:    Box,
  MrMesh: MrMesh,
  Floor:  Floor,
  Target: Target
};
