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

			let b = 1;

			var c;
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

			let b = vars.b;
			assert.strictEqual(b.type, 'number');
			assert.notStrictEqual(b.origin, undefined);

			let old_b = b.at({line: 2});
			assert.strictEqual(old_b, undefined);
		});

		it('should hoist `var` variables', () => {

			let code = `
			let a = 1;
			let b = 1;

			var c;
			var d = 1;
			// Done
			`;

			let runtime = new Protodoc.Runtime();
			let program = runtime.parse(code);
			let vars = program.getScope().getAll();

			let c = vars.c;
			assert.strictEqual(c.type, 'undefined');

			let old_c = c.at({line: 1});
			assert.notStrictEqual(old_c, undefined, 'Variables declared with `var` should be hoisted');
			assert.strictEqual(old_c.type, 'undefined');

			let d = vars.d;
			assert.strictEqual(d.type, 'number');

			let old_d = d.at({line: 1});
			assert.notStrictEqual(old_d, undefined, 'Variables declared with `var` should be hoisted');
			assert.strictEqual(old_d.type, 'undefined', 'Hoisted variables should be `undefined` before the position where they are assigned a value');

			let last_d = d.at({line: 6});
			assert.strictEqual(last_d.type, 'number');
		});

		it('should hoist function statements', () => {

			let code = `
			let a = 1;

			function myFunction() {}

			let b = 0;
			`;

			let runtime = new Protodoc.Runtime();
			let program = runtime.parse(code);
			let vars = program.getScope().getAll();

			let fnc = vars.myFunction;

			assert.strictEqual(fnc.type, 'function');

			let old_fnc = fnc.at({line: 0});
			assert.strictEqual(old_fnc.type, 'function');
		});

		it('should always return last version when getting something from a parent scope', () => {

			let code = `
				let a = 1;
				let b;

				let fnc = function() {
					let internal = true;
					// This is where
					// we should test
					// the positions
				};

				b = 'str';
				let c = {};
				let x = 0;
				var end = true;
			`;

			let runtime = new Protodoc.Runtime();
			let program = runtime.parse(code);
			let vars = program.getScope().getAll();

			let a = vars.a;
			assert.strictEqual(a.type, 'number');

			let b = vars.b;
			assert.strictEqual(b.type, 'string');

			let c = vars.c;
			assert.strictEqual(c.type, 'object');

			let x = vars.x;
			assert.strictEqual(x.type, 'number');

			let old_b = b.at({line: 3});
			assert.strictEqual(old_b.type, 'undefined');

			let scoped_b = b.at({line: 6});
			assert.strictEqual(scoped_b.type, 'string');

			let scoped_c = c.at({line: 6});
			assert.strictEqual(scoped_c.type, 'object');

			let old_c = c.at({line: 2});
			assert.strictEqual(old_c, undefined);

			scope = program.getScopeAt({line: 6});
			vars = scope.getAll();

			check.type(vars, 'internal', 'boolean');
			check.type(vars, 'x', 'number');
			check.type(vars, 'end', 'boolean');

			let scoped_x = vars.x.at({line: 6});
			check.typeof(scoped_x, 'number');

			let end = vars.end;
			let old_end = end.at({line: 6});

			check.typeof(old_end, 'boolean');
		});
	});
});