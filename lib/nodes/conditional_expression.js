/**
 * The ConditionalExpression node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const ConditionalExpression = Fn.inherits('Elevenways.Protodoc.Node.Expression', 'ConditionalExpression');

/**
 * The `test` node property, what is being tested to be truthy
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
ConditionalExpression.setChildNodeProperty('test');

/**
 * The `consequent` node property, if the test is true
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
ConditionalExpression.setChildNodeProperty('consequent');

/**
 * The `alternate` node property, if the test is false
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
ConditionalExpression.setChildNodeProperty('alternate');
