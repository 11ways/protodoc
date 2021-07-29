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
 * Certain declarations should be hoisted
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
VariableDeclaration.setProperty(function hoist() {

	if (this.kind == 'var') {
		return true;
	}

	return false;
});

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
 * @type     {Elevenways.Protodoc.Node.VariableDeclarator[]}
 */
VariableDeclaration.setChildNodeProperty('declarations');

/**
 * Get all names being declared
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String[]}
 */
VariableDeclaration.setMethod(function getNames() {

	let declaration,
	    result = [],
	    name;

	for (declaration of this.declarations) {
		name = declaration.getName();

		if (name != null) {
			result.push(name);
		}
	}

	return result;
});

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