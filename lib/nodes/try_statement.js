/**
 * The TryStatement node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const TryStatement = Fn.inherits('Elevenways.Protodoc.Node', 'TryStatement');

/**
 * The `block` node property: the code that gets "tried"
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
TryStatement.setChildNodeProperty('block');

/**
 * The `handler` node property: the block that does the catching
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
TryStatement.setChildNodeProperty('handler');

/**
 * The `finalizer` node property: the code that always runs `finally`
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
TryStatement.setChildNodeProperty('finalizer');