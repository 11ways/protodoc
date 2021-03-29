/**
 * The AwaitExpression node:
 * waiting for a thennable's result
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const AwaitExpression = Fn.inherits('Elevenways.Protodoc.Node.Expression', 'AwaitExpression');

/**
 * The arguments that are passed to the constructor
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
AwaitExpression.setChildNodeProperty('argument');

// @TODO: resolving the argument to a structure ...