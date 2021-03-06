'use strict';

var THREE = require('three');
var async = require('async');
var OBJ = require('./obj');

var Level = OBJ;

Level.objects = [
  {x: 0, y: 0, t: 'Wall'},
  {x: 1, y: 0, t: 'Wall'},
  {x: 2, y: 0, t: 'Wall'},
  {x: 3, y: 0, t: 'Wall'},
  {x: 4, y: 0, t: 'Wall'},
  {x: 0, y: 1, t: 'Wall'},
  {x: 1, y: 1, t: 'Floor'},
  {x: 2, y: 1, t: 'Floor'},
  {x: 3, y: 1, t: 'Floor'},
  {x: 4, y: 1, t: 'Wall'},
  {x: 5, y: 1, t: 'Wall'},
  {x: 6, y: 1, t: 'Wall'},
  {x: 7, y: 1, t: 'Wall'},
  {x: 0, y: 2, t: 'Wall'},
  {x: 1, y: 2, t: 'Floor'},
  {x: 2, y: 2, t: 'Floor'},
  {x: 3, y: 2, t: 'Floor'},
  {x: 4, y: 2, t: 'Wall'},
  {x: 5, y: 2, t: 'Floor'},
  {x: 6, y: 2, t: 'Floor'},
  {x: 7, y: 2, t: 'Wall'},
  {x: 1, y: 3, t: 'Wall'},
  {x: 2, y: 3, t: 'Floor'},
  {x: 2, y: 3, t: 'MrMesh', id: 'mrMesh'},
  {x: 3, y: 3, t: 'Target', id: 'target1'},
  {x: 4, y: 3, t: 'Wall'},
  {x: 5, y: 3, t: 'Floor'},
  {x: 5, y: 3, t: 'Box'},
  {x: 6, y: 3, t: 'Floor'},
  {x: 7, y: 3, t: 'Wall'},
  {x: 0, y: 4, t: 'Wall'},
  {x: 1, y: 4, t: 'Floor'},
  {x: 2, y: 4, t: 'Floor'},
  {x: 3, y: 4, t: 'Floor'},
  {x: 4, y: 4, t: 'Floor'},
  {x: 5, y: 4, t: 'Floor'},
  {x: 6, y: 4, t: 'Floor'},
  {x: 7, y: 4, t: 'Wall'},
  {x: 0, y: 5, t: 'Wall'},
  {x: 1, y: 5, t: 'Floor'},
  {x: 2, y: 5, t: 'Floor'},
  {x: 3, y: 5, t: 'Wall'},
  {x: 4, y: 5, t: 'Wall'},
  {x: 5, y: 5, t: 'Wall'},
  {x: 6, y: 5, t: 'Wall'},
  {x: 7, y: 5, t: 'Wall'},
  {x: 0, y: 6, t: 'Wall'},
  {x: 1, y: 6, t: 'Floor'},
  {x: 2, y: 6, t: 'Floor'},
  {x: 3, y: 6, t: 'Wall'},
  {x: 0, y: 7, t: 'Wall'},
  {x: 1, y: 7, t: 'Wall'},
  {x: 2, y: 7, t: 'Wall'},
  {x: 3, y: 7, t: 'Wall'}
];

Level.objectById = {};

Level.addObjectsToScene = function(scene) {
  var objects = Level.objects;
  var Constructor;
  var obj;
  var newObj;
  for (var i = 0; i < objects.length; i++) {
    obj = objects[i];
    Constructor = OBJ[obj.t];
    newObj =  new Constructor(obj);
    scene.add(newObj.mesh);
    if (obj.id) {
      Level.objectById[obj.id] = newObj;
    }
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
