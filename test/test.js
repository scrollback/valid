var validator = require("../index.js")();
var assert = require('assert');

var message = {
	type: "text", 
	id: "ksjalfkjklajsfl",
	text: "this is new text",
	room: {
		id: 'jdakjf930784ufjhcu',
		type: 'room'
	}
};


describe("Validator test", function() {
	
	it("should return status true", function() {
		var isValid = validator.validate(message, {
			type: ['string'],
			id: ['string'],
			text: ['string'],
			room: [{
				id: ['string'],
				type: ['string']
			}]
		});
		console.log("Valid", isValid);
		assert.equal(isValid.status, true, "Validation failed");
	});
	
	it("should return status false", function() {
		var isValid = validator.validate(message, {
			type: ['string'],
			id: ['string'],
			text: ['number'],
			room: [{
				id: ['string'],
				type: ['number']
			}]
		});
		console.log("Valid", isValid);
		assert.equal(isValid.status, false, "should not return true");
	});
	
	it("test with function: should return true", function() {
		var isValid = validator.validate(message, {
			type: ['string'],
			id: [function(id) {
				return id.length > 1;
			}],
			text: ['string'],
			room: [{
				id: ['string'],
				type: ['anything']
			}]
		});
		console.log("Valid", isValid);
		assert.equal(isValid.status, true, "should return status true");
	});


	it("test with function: should return false", function() {
		var isValid = validator.validate(message, {
			type: ['string'],
			id: [function(id) {
				return id.length < 1;
			}],
			text: ['string'],
			room: [{
				id: ['string'],
				type: ['anything']
			}]
		});
		console.log("Valid", isValid);
		assert.equal(isValid.status, false, "should return status false");
	});
	
	it("Test for non empty string: false", function() {
		var isValid = validator.validate(message, {
			type: ['nonEmptyString'],
			id: [function(id) {
				return id.length > 1;
			}],
			text: ['string'],
			room: [{
				id: ['string'],
				type: ['anything']
			}]
		});
		console.log("Valid", isValid);
		assert.equal(isValid.status, true, "should return status true");
	});
	
	it("Test for non empty string: false", function() {
		
		message.type = "";
		var isValid = validator.validate(message, {
			type: ['nonEmptyString'],
			id: [function(id) {
				return id.length > 1;
			}],
			text: ['string'],
			room: [{
				id: ['string'],
				type: ['anything']
			}]
		});
		console.log("Valid", isValid);
		message.type = "text";
		assert.equal(isValid.status, false, "should return status false");
	});

	it("Test for strict object: false", function() {
		message.test = [];
		var t = {
			type: ['string'],
			test: ['strictObject'],
			id: ['string'],
			text: ['string'],
			room: [{
				id: ['string'],
				type: ['anything']
			}]
		};
		var isValid = validator.validate(message, t);
		
		console.log("Valid", isValid);
		assert.equal(isValid.status, false, "should return status false");
		t.test = ['object'];
		isValid = validator.validate(message, t)
		assert.equal(isValid.status, true, "should return true");
		delete message.test;
	});
	
	it("Test for nested strict object: true", function() {
		message.test = {};
		var t = {
			type: ['string'],
			test: ['strictObject'],
			id: ['string'],
			text: ['string'],
			room: [{
				id: ['string'],
				type: ['anything'],
				temp: ['strictObject']
			}]
		};
		//message.room.temp = {};
		var isValid = validator.validate(message, t);

		console.log("Valid", isValid);
		assert.equal(isValid.status, false, "should return status false");
		delete message.test;
		delete message.room.temp;
	});


	it("Test for strict object: true", function() {
		message.test = {};
		var t = {
			type: ['string'],
			test: ['strictObject'],
			id: ['string'],
			text: ['string'],
			room: [{
				id: ['string'],
				type: ['anything'],
				temp: ['strictObject']
			}]
		};
		message.room.temp = {};
		var isValid = validator.validate(message, t);

		console.log("Valid", isValid);
		assert.equal(isValid.status, true, "should return status true");
		t.test = ['object'];
		isValid = validator.validate(message, t)
		assert.equal(isValid.status, true, "should return true");
		delete message.test;
		delete message.room.temp;
	});
	



	it("Test for adding function: return true", function() {
		validator.registerType('zero', function(v) {
			return v === 0;
		});
		message.number = 0;
		var t = {
			"number": ['zero']
		};
		var isValid = validator.validate(message, t);
		assert.equal(isValid.status, true, "Should return true");
	});
	
	
	it("Test for adding function: return false", function() {
		message.number = 1;
		var t = {
			"number": ['zero']
		};
		var isValid = validator.validate(message, t);
		assert.equal(isValid.status, false, "Should return false");
	});
	
	it("Test for deep object", function() {
		var room = {
			params: {
				threader: { enabled: true}
			}
		}
		var t = {
			params: [{
				threader: ['undefined', {
					enabled: ['boolean']
				}]
			}]
		}
		var isValid = validator.validate(room, t);
		assert.equal(isValid.status, true, "Should return false");
	});


});
