var Result = require('./result.js');
var keys = {};

function Validator(k) {
	if (!k) this.keys = {};
	else this.keys = k;
	this.ckeys = {};
}

Validator.prototype.validate = function (obj, valid) {

	var ret = new Result(false);
	if (typeof obj === 'object') {
		ret = new Result(true);
		for (var e in valid) {
			if (valid.hasOwnProperty(e)) {
				var el = obj[e];
				var v = valid[e];
				var result = new Result(false);
				for (var i = 0; i < v.length; i++) {
					var t = v[i];
					if (typeof t === 'string') {
						result.status = result.status || this.getType(t)(el);
					} else if (typeof t === 'function') {
						result.status = result.status || t(el);
					} else if (typeof t === 'object' && typeof el === 'object') {
						result = result.or(this.validate(el, t));
					}
				}
				if (!result.status) {
					result.info += "Validation failed for property " + e + ":";
				}
				ret = ret.and(result);
			}
		}
	}
	return ret;
};




Validator.prototype.getType = function (key) {
	if (this.ckeys[key]) return this.ckeys[key];
	else return keys[key];
};

Validator.prototype.registerType = function (key, fn) {
	if ((typeof key === 'string') && (typeof fn !== 'function')) throw new Error("INVALID_PARAMS");
	this.ckeys[key] = fn;
};

Validator.registerGlobalType = function (key, fn) {
	if ((typeof key === 'string') && (typeof fn !== 'function')) throw new Error("INVALID_PARAMS");
	keys[key] = fn;
};


module.exports = Validator;
