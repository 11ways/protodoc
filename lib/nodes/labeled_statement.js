/**
 * The LabeledStatement node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const LabeledStatement = Fn.inherits('Elevenways.Protodoc.Node.Node', 'LabeledStatement');

/**
 * The name of the label
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
LabeledStatement.setChildNodeProperty('label');

/**
 * The 'body' of this label
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
LabeledStatement.setChildNodeProperty('body');