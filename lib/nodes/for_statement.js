/**
 * The ForStatement node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const ForStatement = Fn.inherits('Elevenways.Protodoc.Node', 'ForStatement');

/**
 * The `init` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
ForStatement.setChildNodeProperty('init');

/**
 * The `update` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
ForStatement.setChildNodeProperty('update');

/**
 * The `body` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
ForStatement.setChildNodeProperty('body');

/**
 * The `test` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
ForStatement.setChildNodeProperty('test');

/**
 * Process this function expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
ForStatement.setMethod(function process() {

	// For statements create a kind of "block" scope outside of the body
	let scope = this.createBlockScope();
	this.setScope(scope);

	this.processNodes(this.init);
	this.processNodes(this.update);
	this.processNodes(this.body);
	this.processNodes(this.test);
});