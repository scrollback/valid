function addBasicTypes(validator) {
	validator.registerGlobalType('anything', function() { return true;}); 
	validator.registerGlobalType('array', function(v) {
		return v instanceof Array;
	});
	validator.registerGlobalType('null', function(v) { return v === null;}); 
	var to = ['object', 'undefined', 'number', 'string', 'boolean']
	to.forEach(function(type) {
		validator.registerGlobalType(type, function(v) {
			return typeof v === type;
		});
	});
	validator.registerGlobalType('nonEmptyString', function(v) {
		return ((typeof v === 'string') && (v.length > 0));
	});
	validator.registerGlobalType('strictObject', function(v) {
		return (typeof v === 'object' && (!(v instanceof Array)) && v !== null);
	});
}


module.exports = addBasicTypes;
