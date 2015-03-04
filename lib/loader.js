'use strict';

var THREE = require('three');
var async = require('async');
var OBJ = require('./obj');

var Level = OBJ;

Level.objects = [
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
];

Level.addObjectsToScene = function(scene) {
  var objects = Level.objects;
  var obj;
  for (var i = 0; i < objects.length; i++) {
    switch (objects[i].t) {
      case 'floor':
        obj = new OBJ.Floor(objects[i].x, objects[i].y);
        break;

      case 'target':
        obj = new OBJ.Target(objects[i].x, objects[i].y);
        break;

      case 'box':
        obj = new OBJ.Box(objects[i].x, objects[i].y);
        break;

      case 'mr_mesh':
        obj = new OBJ.MrMesh(objects[i].x, objects[i].y);
        break;

      default:
        throw new Error('Unknown object type: ' + objects[i].t);
    }
    scene.add(obj.mesh);
  }
};

module.exports = {

  /**
   * Load the level
   * @param callback
   */
  loadLevel: function(callback) {
    var loader = new THREE.JSONLoader();
    async.parallel([

      function(cb) {
        loader.load('geometry/box.json', function(geo) {
          OBJ.Box.prototype.geometry = geo;
          cb(null);
        });
      },

      function(cb) {
        loader.load('geometry/mr_mesh.json', function(geo) {
          OBJ.MrMesh.prototype.geometry = geo;
          cb(null);
        });
      }

    ], function(err) {
      if (err) {
        callback(err);
      } else {
        callback(null, Level);
      }
    });
  }
};
