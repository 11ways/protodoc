/**
 * The BlockStatement node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const Block = Fn.inherits('Elevenways.Protodoc.Node', 'BlockStatement');

/**
 * The `body` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
Block.setChildNodeProperty('body');

/**
 * Process this block statement
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Block.setMethod(function process() {

	// Create a new block scope
	let scope = this.createBlockScope();
	this.setScope(scope);

	this.processWithExistingScope();
});

/**
 * Process this block statement with its existing scope
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Block.setMethod(function processWithExistingScope() {

	let owner = this.parent.getScope();

	this.processNodes(this.body);

});