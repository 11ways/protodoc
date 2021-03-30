/**
 * The ForInStatement node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const ForInStatement = Fn.inherits('Elevenways.Protodoc.Node.ForOfStatement', 'ForInStatement');

/**
 * For...in statements are never async
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
ForInStatement.setProperty('await', false);

/**
 * Process this function expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
ForInStatement.setMethod(function process() {

	let key;

	// For statements create a kind of "block" scope outside of the body
	let scope = this.createBlockScope();
	this.setScope(scope);

	this.processNodes(this.left);
	this.processNodes(this.right);

	if (this.left && this.left instanceof Protodoc.Node.Identifier) {
		key = this.left.name;
	} else if (this.left && this.left instanceof Protodoc.Node.VariableDeclaration) {
		let keys = this.left.getNames();
		key = keys[0];
	}

	this.processNodes(this.body);

	if (key) {
		let value = this.createStructure('string');
		let variable = scope.get(key);
		variable.assign(value, this);
	}
});