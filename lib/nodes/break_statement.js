/**
 * The BreakStatement node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const BreakStatement = Fn.inherits('Elevenways.Protodoc.Node.Node', 'BreakStatement');

/**
 * The optional label to break to
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
BreakStatement.linkEspreeProperty('label');