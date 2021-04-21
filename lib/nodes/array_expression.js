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
 * @return   {Elevenways.Protodoc.Structure.Object}
 */
ArrayExpression.setMethod(function createResultStructure() {

	let value = this.createStandardInstance('Array');

	return value;
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
ArrayExpression.setMethod(function getWorkingStructure() {
	return this.getResultStructure();
});

/**
 * Process the contents of this array
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
ArrayExpression.setMethod(function process() {

	let structure = this.getResultStructure(),
	    element,
	    value,
	    i;

	this.processNodes(this.elements);

	for (i = 0; i < this.elements.length; i++) {
		element = this.elements[i];

		// @TODO: This will return the `Variable` structure of variables,
		// meaning they can change by-reference, which is not correct.
		value = element.getResultStructure();

		structure.set(i, value);
	}
});