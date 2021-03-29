/**
 * The ForInStatement node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const ForInStatement = Fn.inherits('Elevenways.Protodoc.Node.ForOfStatement', 'ForInStatement');

/**
 * For...in statements are never async
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
ForInStatement.setProperty('await', false);