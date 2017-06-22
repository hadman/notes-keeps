/**
 * Created by hopman on 6/13/17.
 */
var nconf = require('nconf');
var path = require('path');

nconf.argv()
.env()
.file({file:path.join(__dirname, 'config.json')});

module.exports = nconf;
