/**
 * The ReturnStatement node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const ReturnStatement = Fn.inherits('Elevenways.Protodoc.Node', 'ReturnStatement');

/**
 * The `argument` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
ReturnStatement.setChildNodeProperty('argument');

/**
 * Process this return statement
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
ReturnStatement.setMethod(function process() {
	console.log('@TODO: Return statement processing');
});