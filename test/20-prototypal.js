describe('Protodoc.Structure.Prototypal', () => {

	describe('#get(name)', () => {

		it('should return a property of the current object', () => {

			let source = `
				let foo = {a: 1};
			`;

			let {vars, foo} = testDeclaration(source);

			let a = foo.get('a');

			check.typeof(a, 'number');

			let proto = foo.get('prototype');
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

		it('should find properties set in the constructor', () => {

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

		it('should find properties set with a `call`-ed method (that has been hoisted)', () => {

			let source = `

				function Test() {
					this.zever = 1;
					more.call(this);
				}

				function more() {
					this.more = true;
				}

				let foo = new Test();
			`;

			let {vars, foo} = testDeclaration(source);

			let zever = foo.get('zever');
			let more = foo.get('more');

			check.typeof(zever, 'number');
			check.typeof(more, 'boolean');

			source = `

				function Test() {
					this.zever = 1;
					more.call({});
				}

				function more() {
					this.more = true;
				}

				let foo = new Test();
			`;

			let two = testDeclaration(source);

			foo = two.foo;

			zever = foo.get('zever');
			more = foo.get('more');

			check.typeof(zever, 'number');
			assert.strictEqual(more, undefined)
		});
	});

});