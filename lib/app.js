'use strict';

// jshint browser:true
// jshint browserify:true

var Sokoban = require('./sokoban');

window.addEventListener('load', function() {
  var sokoban = new Sokoban(window);
  sokoban.run();
}, false);
