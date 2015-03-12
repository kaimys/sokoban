'use strict';

// jshint browser:true
// jshint browserify:true

var Sokoban = require('./sokoban');
var sokoban;

var VK = {
  LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40
};

window.addEventListener('load', function() {
  sokoban = new Sokoban(window);
  sokoban.run();
}, false);

window.addEventListener('keydown', function(e) {
  if(e.shiftKey) {
    switch (e.keyCode) {
      case VK.LEFT:
        sokoban.deltaPhi = - 0.01;
        break;
      case VK.RIGHT:
        sokoban.deltaPhi = + 0.01;
        break;
      case VK.UP:
        sokoban.deltaTheta = + 0.01;
        break;
      case VK.DOWN:
        sokoban.deltaTheta = - 0.01;
        break;
    }
  }
}, false);

window.addEventListener('keyup', function(e) {
  if(e.shiftKey) {
    switch (e.keyCode) {
      case VK.LEFT:
      case VK.RIGHT:
        sokoban.deltaPhi = 0.0;
        break;
      case VK.UP:
      case VK.DOWN:
        sokoban.deltaTheta = 0.0;
        break;
    }
  }
}, false);
