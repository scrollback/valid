function addBasicTypes(validator) {
	validator.registerGlobalType('string', function(v) { return typeof v === 'string';});
	validator.registerGlobalType('number', function(v) { return typeof v === 'number';});
	validator.registerGlobalType('anything', function() { return true;}); 
	validator.registerGlobalType('undefined', function(v) { return typeof v === 'undefined';});
	validator.registerGlobalType('array', function(v) {
		return v instanceof Array;
	});
}


module.exports = addBasicTypes;