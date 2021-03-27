/**
 * The ArrayExpression node:
 * creating an array
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const ArrayExpression = Fn.inherits('Elevenways.Protodoc.Node.Expression', 'ArrayExpression');

/**
 * The `elements` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
ArrayExpression.setChildNodeProperty('elements');

/**
 * Get the type of the result of this expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
ArrayExpression.setMethod(function createResultStructure() {

	let structure = this.createStructure('object', 'Array');

	return structure;
});

/**
 * This object creates a new context
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
ArrayExpression.setMethod(function getContext() {
	return this.getResultStructure();
});