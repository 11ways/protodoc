/**
 * The VariableDeclaration node:
 * declaring (multiple) variables
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const VariableDeclaration = Fn.inherits('Elevenways.Protodoc.Node', 'VariableDeclaration');

/**
 * The kind of declaration:
 * var, let or const
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {String}
 */
VariableDeclaration.linkEspreeProperty('kind');

/**
 * The `declarations` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
VariableDeclaration.setChildNodeProperty('declarations');

/**
 * Process this node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
VariableDeclaration.setMethod(function process() {
	this.processNodes(this.declarations);
});