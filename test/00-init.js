const assert = require('assert');

global.Protodoc = null;

describe('Protodoc', () => {

	it('should load the namespace', () => {
		global.Protodoc = require('../index.js');
	});

});