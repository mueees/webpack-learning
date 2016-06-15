'use strict';

// import angular from 'angular';

// This's our lib from NPM
import webpackSimpleLibrary from 'webpack-simple-library/dist/mue';
webpackSimpleLibrary();

import welcome from './welcome';

welcome('About');

// we load jquery from cdn
var $ = require('jquery');

// global variable from externals webpack config
map([1, 2, 3]);

var plugins = ['slider', 'weather'];

// dynamic require plugins
require('./plugins/' + plugins[0]);

// or using context module
// require.context(directory, useSubdirectories = false, regExp = /^\.\//)
let pluginsContext = require.context('./plugins', false);
pluginsContext('./weather');

// or we can dynamically require all modules from folder
let widgetsContext = require.context('./widgets', false);

widgetsContext.keys().forEach(function (moduleName) {
    widgetsContext(moduleName);
});

setTimeout(function () {
    console.log('Load dynamic plugin');

    var dynamicallyModule = 'dynamic-a.js';
    require('bundle!./dynamic-plugins/' + dynamicallyModule);
}, 1000);

exports.welcome = welcome;