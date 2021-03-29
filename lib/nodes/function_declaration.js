const FEProto = Protodoc.Node.FunctionExpression.prototype;

/**
 * The FunctionDeclaration node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const FunctionDeclaration = Fn.inherits('Elevenways.Protodoc.Node', 'FunctionDeclaration');

/**
 * Functions can create contexts
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
FunctionDeclaration.setProperty('creates_context', true);

/**
 * Is this an async function?
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
FunctionDeclaration.linkEspreeProperty('async');

/**
 * Is this a generator?
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
FunctionDeclaration.linkEspreeProperty('generator');

/**
 * The `id` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
FunctionDeclaration.setChildNodeProperty('id');

/**
 * The `body` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
FunctionDeclaration.setChildNodeProperty('body');

/**
 * The `params` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
FunctionDeclaration.setChildNodeProperty('params');

/**
 * Get the name of the variable it's declaring
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
FunctionDeclaration.setMethod(function getName() {
	return FEProto.getName.call(this);
});

/**
 * Get the type of the expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
FunctionDeclaration.setMethod(function createResultStructure() {
	return FEProto.createResultStructure.call(this);
});

/**
 * Process this function declaration
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
FunctionDeclaration.setMethod(function process() {

	FEProto.process.call(this);

	let structure = this.getResultStructure(),
	    owner = this.parent.getScope(),
	    name = this.getName();

	if (!name) {
		// Syntax error
		return;
	}

	owner.declare('function', this, name, structure);
});