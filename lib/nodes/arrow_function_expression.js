/**
 * The ArrowFunctionExpression node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const ArrowFunctionExpression = Fn.inherits('Elevenways.Protodoc.Node.FunctionExpression', 'ArrowFunctionExpression');

/**
 * Arrow functions don't create contexts
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
ArrowFunctionExpression.setProperty('creates_context', false);