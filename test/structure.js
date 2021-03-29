const assert = require('assert');


describe('Protodoc.Structure.Structure', () => {

	describe('#at(position)', () => {
		it('should return the structure as it was at the given position', () => {

			let code = `
			let a = 1;
			// A should now be a number

			a = null;
			// Now it should be null

			a = {};
			// Not it should be an object

			a = 'string';
			// And now it's a string!
			`;

			let runtime = new Protodoc.Runtime();
			let program = runtime.parse(code);
			let vars = program.getScope().getAll();
			let a = vars.a;

			// The "end" result should be a string
			assert.strictEqual(a.type, 'string');
			assert.strictEqual(a.class, null);

			let old_a = a.at({line: 2});
			assert.strictEqual(old_a.type, 'number');
			assert.strictEqual(old_a.class, null);

			old_a = a.at({line: 1, character: 7});
			assert.strictEqual(old_a.type, 'number');
			assert.strictEqual(old_a.class, null);

			old_a = a.at({line: 5});
			assert.strictEqual(old_a.type, 'null');

			old_a = a.at({line: 8});
			assert.strictEqual(old_a.type, 'object');
			assert.strictEqual(old_a.class, 'Object');

			old_a = a.at({line: 10, character: 3});
			assert.strictEqual(old_a.type, 'string');
			assert.strictEqual(old_a.class, null);
		});
	});
});