var Jasmine = require('jasmine');
var jasmine = new Jasmine();
require('module-alias/register');

jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.execute();
