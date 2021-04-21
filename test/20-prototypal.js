describe('Protodoc.Structure.Prototypal', () => {

	describe('#get(name)', () => {

		it('should return a property of the current object', () => {

			let source = `
				let foo = {a: 1};
			`;

			let {vars, foo} = testDeclaration(source);

			let a = foo.get('a');

			check.typeof(a, 'number');
		});

		it('should look for prototype properties for globals', () => {

			let source = `
				let foo = [];
			`;

			let {vars, foo} = testDeclaration(source);

			let length = foo.get('length');

			check.typeof(length, 'number');

		});

		it('should look in the parent object for properties', () => {

			let source = `
				let MyClass = function MyClass() {};
				MyClass.prototype.x = 47;
				let foo = new MyClass();
			`;

			let {vars, foo} = testDeclaration(source);

			let x = foo.get('x');

			check.typeof(x, 'number');
		});

		it.skip('should find properties set in the constructor', () => {

			let source = `
				let MyClass = function MyClass() {
					this.y = 'test';
				};
				MyClass.prototype.x = 47;
				let foo = new MyClass();
			`;

			let {vars, foo} = testDeclaration(source);

			let x = foo.get('x');

			check.typeof(x, 'number');
			check.typeof(foo.get('y'), 'string');
		});
	});

});