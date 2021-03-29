/**
 * The LogicalExpression node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const LogicalExpression = Fn.inherits('Elevenways.Protodoc.Node.BinaryExpression', 'LogicalExpression');

/**
 * Get the result structure of this expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
LogicalExpression.setMethod(function createResultStructure() {
	// @TODO: Return possible results?
});

/**
 * This can't be statically evaluated
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {undefined}
 */
LogicalExpression.setMethod(function evaluate() {

});