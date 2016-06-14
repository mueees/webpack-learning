'use strict';

import welcome from './welcome';

welcome('Home');

document.getElementById('login').onclick = function () {
    // it doesn't work
    //let login = require('./login');

    require.ensure([], function (require) {
        let login = require('./login');

        login();
    }, 'auth');
};

document.getElementById('logout').onclick = function () {
    require.ensure([], function (require) {
        let logout = require('./logout');

        logout();
    }, 'auth');
};

exports.welcome = welcome;