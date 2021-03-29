const assert = require('assert');
let current_type;

function testNode(name, fnc) {
	it('should parse ' + name, () => {
		current_type = name;
		fnc();
		current_type = null;
	});
}

function parse(source) {
	let runtime = new Protodoc.Runtime();
	return runtime.parse(source);
}

function testDeclaration(source) {

	let root = parse(source),
	    scope = root.getScope(),
	    vars = scope.getAll();

	let foo = vars.foo;

	assert.notStrictEqual(foo, undefined, 'Expected to find the variable "foo"');

	if (current_type) {

		let found_type = false;

		for (let node of root.all_nodes) {
			if (node.constructor.name == current_type) {
				found_type = true;
				break;
			}
		}

		if (!found_type) {
			throw new Error('Could not find a node of type "' + current_type + '"');
		}
	}

	return {
		root,
		scope,
		vars,
		foo,
	};
}

describe('Protodoc.Node', () => {

	testNode('ArrayExpression', () => {
		let source = `
			let foo = [1, 2, 3];
		`;

		let {foo} = testDeclaration(source);

		assert.strictEqual(foo.type, 'object');
		assert.strictEqual(foo.class, 'Array');
	});

	testNode('ArrowFunctionExpression', () => {

		let {foo} = testDeclaration(`let foo = err => 1`);

		assert.strictEqual(foo.type, 'function');
		assert.strictEqual(foo.class, 'Function');
	});

	testNode('AssignmentExpression', () => {

		let {foo} = testDeclaration(`let foo; foo = 1`);

		assert.strictEqual(foo.type, 'number');
		assert.strictEqual(foo.class, null);
	});

	testNode('AwaitExpression', () => {

		let node = parse(`async function foo() {
			await test();
		}`);

		// @TODO: tests

	});

	// testNode('AssignmentPattern', () => {

	// });

	testNode('BinaryExpression', () => {

		let {foo} = testDeclaration(`let foo = 1 + 1`);

		assert.strictEqual(foo.type, 'number');
		assert.strictEqual(foo.class, null);
	});

	// testNode('BlockStatement', () => {

	// });

	// testNode('BreakStatement', () => {

	// });

	testNode('CallExpression', () => {

		let {foo} = testDeclaration(`let foo = test()`);

		assert.strictEqual(foo.type, 'undefined');
		assert.strictEqual(foo.class, null);
	});

	testNode('ObjectPattern', () => {

		let {vars} = testDeclaration('let {foo} = {foo: 1}');

		check.type(vars, 'foo', 'number');
	});

	testNode('RestElement', () => {

		let {vars} = testDeclaration('let {a, foo, ...others} = {a: 1, b: 2, c: 3, foo: 99}');

		check.type(vars, 'a', 'number');
		check.type(vars, 'others', 'object');

		let others = vars.others;

		check.typeof(others.get('b'), 'number');
		check.typeof(others.get('c'), 'number');

		assert.strictEqual(others.get('a'), undefined);
		assert.strictEqual(others.get('foo'), undefined);
	});

	testNode('TemplateLiteral', () => {

		let {vars} = testDeclaration('let foo = `a string`');

		check.type(vars, 'foo', 'string');
	});

	
});