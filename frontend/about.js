'use strict';

import welcome from './welcome';

welcome('About');

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

/*var dynamicallyModule = 'dynamic-a.js';
 require('bundle!./dynamic-plugins/' + dynamicallyModule);*/

exports.welcome = welcome;