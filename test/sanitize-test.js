var validator = require("../index.js")();
var assert = require('assert');

var message =

	it("should sanitize an invalid object", function() {
		var sanitize = validator.sanitize({
			type: "text",
			id: null,
			text: "this is new text",
			room: {
				id: 'jdakjf930784ufjhcu',
				type: 'room'
			}
		}, {
			type: ['string'],
			id: ['string'],
			text: ['string'],
			room: [{
				id: ['string'],
				type: ['string']
			}]
		}, {
			id: "defaultid",
			room: {
				id: 'jdakjf930784ufjhcu',
				type: 'room'
			}
		});
		console.log("Sanitize: ", sanitize);
		assert.equal(sanitize.sanitized.id, "defaultid", "sanitization failed");
	});

it("should sanitize invalid object", function() {
	var sanitize = validator.sanitize({
		type: "text",
		id: "SAdasdasdd",
		text: "this is new text",
		room: {
			id: 3223,
			type: 4324
		}
	}, {
		type: ['string'],
		id: ['number'],
		text: ['number'],
		room: [{
			id: ['string'],
			type: ['string']
			}]
	}, {
		id: 21341,
		text: 3424,
		room: {
			id: 'jdakjf930784ufjhcu',
			type: 'room'
		}
	});
	console.log("Sanitize: ", sanitize);
	assert.deepEqual(sanitize.invalid, ['id', 'text', 'room']);
	assert.deepEqual(sanitize.sanitized, {
		type: 'text',
		id: 21341,
		text: 3424,
		room: {
			id: 'jdakjf930784ufjhcu',
			type: 'room'
		}
	}, "sanitization failed");
});

it("should return status false if no defaultvalue", function() {
	var sanitize = validator.sanitize({
		type: "text",
		id: null,
		text: "this is new text",
		room: {
			id: 'jdakjf930784ufjhcu',
			type: 'room'
		}
	}, {
		type: ['string'],
		id: ['string'],
		text: ['string'],
		room: [{
			id: ['string'],
			type: ['string']
			}]
	});
	console.log("Sanitize: ", sanitize);
	assert.equal(sanitize.status, false, "should return false");
});

it("should throw error if no defaultvalue", function() {
	var sanitize = validator.sanitize({
		type: "text",
		id: null,
		text: "this is new text",
		room: {
			id: 'jdakjf930784ufjhcu',
			type: 'room'
		}
	}, {
		type: ['string'],
		id: ['string'],
		text: ['string'],
		room: [{
			id: ['string'],
			type: ['string']
			}]
	}, {});
	console.log(sanitize.err);
	assert.equal(sanitize.err, "NO_DEFAULT_VALUE", "should return false");
});
