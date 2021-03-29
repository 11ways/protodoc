/**
 * The ThisExpression node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const ThisExpression = Fn.inherits('Elevenways.Protodoc.Node', 'ThisExpression');

/**
 * Get the result structure of `this`
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
ThisExpression.setMethod(function getResultStructure() {
	return this.getContext();
});