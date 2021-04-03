/**
 * The ObjectExpression node:
 * creating an object
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const ObjectExpression = Fn.inherits('Elevenways.Protodoc.Node.Expression', 'ObjectExpression');

/**
 * The `properties` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
ObjectExpression.setChildNodeProperty('properties');

/**
 * Get the type of the result of this expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Object}
 */
ObjectExpression.setMethod(function createResultStructure() {
	return this.createObject();
});

/**
 * This object creates a new working structure
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
ObjectExpression.setMethod(function getWorkingStructure() {
	return this.getResultStructure();
});