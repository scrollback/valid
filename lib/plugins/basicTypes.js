function addBasicTypes(validator) {
	validator.registerGlobalType('anything', function() { return true;}); 
	validator.registerGlobalType('array', function(v) {
		return v instanceof Array;
	});
	validator.registerGlobalType('null', function(v) { return v === null;}); 
	var to = ['object', 'undefined', 'number', 'string']
	to.forEach(function(type) {
		validator.registerGlobalType(type, function(v) {
			return typeof v === type;
		});
	});

}


module.exports = addBasicTypes;