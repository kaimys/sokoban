'use strict';

var THREE = require('three');
var async = require('async');

/**
 * Base class for all objects
 * @constructor
 */
function Base() {
  this.mesh = new THREE.Mesh(this.geometry, this.material);
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
  this.mesh.position.set(100 * x, 100 * y, 0);
}

Floor.prototype = new Base();

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
  this.mesh.position.set(100 * x, 100 * y, 0);
}

Target.prototype = new Base();

Target.prototype.material = new THREE.MeshPhongMaterial({
  ambient: 0x8888ff, color: 0x7777ff, specular: 0x6666ff,
  shininess: 20, shading: THREE.FlatShading
});

var Level = {

  /**
   * Load the level
   * @param callback
   */
  load: function(callback) {
    var loader = new THREE.JSONLoader();
    async.parallel([
      function(cb) {
        loader.load('geometry/box.json', function(geo) {
          Box.prototype.geometry = geo;
          cb(null);
        });
      },

      function(cb) {
        loader.load('geometry/mr_mesh.json', function(geo) {
          MrMesh.prototype.geometry = geo;
          cb(null);
        });
      },

      function(cb) {
        Floor.prototype.geometry = new THREE.PlaneGeometry(100, 100);
        cb(null);
      },

      function(cb) {
        Target.prototype.geometry = new THREE.PlaneGeometry(100, 100);
        cb(null);
      }
    ], function() {
      callback(null);
    });
  },

  objects: [
    {x: 1, y: 1, t: 'floor'},
    {x: 2, y: 1, t: 'floor'},
    {x: 3, y: 1, t: 'floor'},
    {x: 1, y: 2, t: 'floor'},
    {x: 2, y: 2, t: 'floor'},
    {x: 3, y: 2, t: 'floor'},
    {x: 5, y: 2, t: 'floor'},
    {x: 6, y: 2, t: 'floor'},
    {x: 2, y: 3, t: 'floor'},
    {x: 2, y: 3, t: 'mr_mesh'},
    {x: 3, y: 3, t: 'target'},
    {x: 5, y: 3, t: 'floor'},
    {x: 5, y: 3, t: 'box'},
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
    {x: 2, y: 6, t: 'floor'}
  ],

  addObjectsToScene: function(scene) {
    var objects = Level.objects;
    var obj;
    for (var i = 0; i < objects.length; i++) {
      switch (objects[i].t) {
        case 'floor':
          obj = new Level.Floor(objects[i].x - 3, objects[i].y - 3);
          break;

        case 'target':
          obj = new Level.Target(objects[i].x - 3, objects[i].y - 3);
          break;

        case 'box':
          obj = new Level.Box(2, 0);
          break;

        case 'mr_mesh':
          obj = new Level.MrMesh(-1, 0);
          break;

        default:
          throw new Error('Unknown object type: ' + objects[i].t);
      }
      scene.add(obj.mesh);
    }
  },

  Box: Box,
  MrMesh: MrMesh,
  Floor: Floor,
  Target: Target

};

module.exports = Level;
