const assert = require('assert');

global.Protodoc = null;
global.assert = assert;
global.check = {};

check.typeof = function checkTypeOf(value, type, message) {

	let has_message = !!message;

	if (!has_message) {
		message = 'Expected a variable of type "' + type + '", but it was not found';
	}

	assert.notStrictEqual(value, undefined, message);

	if (!has_message) {
		message = 'Expected the type "' + type + '"';
	}

	assert.strictEqual(value.type, type, message);
}

check.type = function checkVariableType(vars, name, type) {

	let variable = vars[name];

	assert.notStrictEqual(variable, undefined, 'Expected a variable named "' + name + '"');

	assert.strictEqual(variable.type, type, 'The "' + name + '" variable should be of type "' + type + '"');
};

describe('Protodoc', () => {

	it('should load the namespace', () => {
		global.Protodoc = require('../index.js');
	});

});