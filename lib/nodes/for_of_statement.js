/**
 * The ForOfStatement node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const ForOfStatement = Fn.inherits('Elevenways.Protodoc.Node', 'ForOfStatement');

/**
 * Is this an async for...of ?
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
ForOfStatement.linkEspreeProperty('await');

/**
 * The `left` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
ForOfStatement.setChildNodeProperty('left');

/**
 * The `right` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
ForOfStatement.setChildNodeProperty('right');

/**
 * The `body` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
ForOfStatement.setChildNodeProperty('body');

/**
 * Process this function expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
ForOfStatement.setMethod(function process() {

	// For statements create a kind of "block" scope outside of the body
	let scope = this.createBlockScope();
	this.setScope(scope);

	this.processNodes(this.left);
	this.processNodes(this.right);
	this.processNodes(this.body);
});