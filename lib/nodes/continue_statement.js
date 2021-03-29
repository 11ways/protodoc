/**
 * The ContinueStatement node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const ContinueStatement = Fn.inherits('Elevenways.Protodoc.Node.BreakStatement', 'ContinueStatement');

/**
 * The optional label to continue to
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
ContinueStatement.linkEspreeProperty('label');