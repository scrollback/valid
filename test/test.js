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
});