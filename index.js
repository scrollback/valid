var keys = {};
var Validator = require("./lib/valid.js");
require('./lib/plugins/basicTypes.js')(Validator);

module.exports = function() {
	return new Validator(keys);
};