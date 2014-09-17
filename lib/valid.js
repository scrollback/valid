var Result = require('./result.js');
var keys = {};
function Validator(k) {
	if (!k) this.keys = {};
	else {
		this.keys = k;
	}
	this.ckeys = {};
}

Validator.prototype.validate = function(obj, valid) {
	
	console.log("Object", obj, "Valid", valid);
	var ret = new Result(true);
	if (typeof obj === 'object') {
		for (var e in obj) {
			if (obj.hasOwnProperty(e)) {
				var el = obj[e];
				var v = valid[e];
				if (v) {
					var result = new Result(false);
					for (var i = 0;i < v.length;i++) {
						var t = v[i];
						if (typeof t === 'string') {
							result.status = result.status || this.getType(t)(el);
						} else if (typeof t === 'function') {
							result.status = result.status || t(el);
						} else if (typeof t === 'object') {
							result = result.or(this.validate(el, t));
						}
					}
					ret = ret.and(result);
				}/* else {
					//console.log("rules not defined");
				}*/
			}
		}
	}
	return ret;
};




Validator.prototype.getType = function(key) {
	if (this.ckeys[key]) return this.ckeys[key];
	else return keys[key];
};

Validator.prototype.registerType = function (key, fn) {
	if ((typeof key === 'string') && (typeof fn != 'function')) throw new Error("INVALID_PARAMS");
	this.ckeys[key] = fn;
};

Validator.registerGlobalType = function(key, fn) {
	if ((typeof key === 'string') && (typeof fn != 'function')) throw new Error("INVALID_PARAMS");
	keys[key] = fn;
};


module.exports = Validator;