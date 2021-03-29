/**
 * The base Expression node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const Expression = Fn.inherits('Elevenways.Protodoc.Node', 'Expression');

/**
 * Create the structure of the result of this expression.
 * By default it'll return an `undefined` structure
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Expression.setMethod(function createResultStructure() {
	return this.createStructure('undefined');
});