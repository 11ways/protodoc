/**
 * The SwitchCase node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const SwitchCase = Fn.inherits('Elevenways.Protodoc.Node.Node', 'SwitchCase');

/**
 * The value to compare the switch statement's discriminant against
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
SwitchCase.setChildNodeProperty('test');

/**
 * The nodes to execute if the test passes
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
SwitchCase.setChildNodeProperty('consequent');