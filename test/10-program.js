
describe('Protodoc.Node.Program', () => {

	describe('#getScopeAt(position)', () => {

		it('should get the scope at the wanted position', () => {

			let code = `
			let a = 1;

			let fnc = function myFunction(x) {
				let internal = true;
				// Test
				// Scope
				// Here
			};

			let b = 2;
			`;

			let runtime = new Protodoc.Runtime();
			let program = runtime.parse(code);

			let scope = program.getScopeAt({line: 5});

			let vars = scope.getAll();

			check.type(vars, 'a', 'number');
			check.type(vars, 'b', 'number');
			check.type(vars, 'fnc', 'function');
			check.type(vars, 'myFunction', 'function');

			check.type(vars, 'x', 'undefined');
			check.type(vars, 'internal', 'boolean');
		});
	});

	describe('#getNodeAt(position)', () => {
		it('should return the node at a given position', () => {

			let code = `
				let nr = 1;
				let str = "str";
				let obj = {a: 1};
				obj.
			`;

			let runtime = new Protodoc.Runtime();
			let program = runtime.parse(code);

		});
	})
});