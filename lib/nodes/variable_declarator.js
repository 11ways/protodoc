/**
 * The VariableDeclarator node:
 * declaring a variable with a value
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const VariableDeclarator = Fn.inherits('Elevenways.Protodoc.Node', 'VariableDeclarator');

/**
 * The `id` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
VariableDeclarator.setChildNodeProperty('id');

/**
 * The `init` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
VariableDeclarator.setChildNodeProperty('init');

/**
 * Get the name of the variable it's declaring
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
VariableDeclarator.setMethod(function getName() {
	if (this.id) {
		return this.id.name;
	}
});

/**
 * Create the result structure of the declared variable
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
VariableDeclarator.setMethod(function createResultStructure() {

	let variable,
	    value;

	if (this.init && this.init.getResultStructure) {
		value = this.init.getResultStructure();
	}

	if (!value) {
		variable = this.createStructure('undefined');
	} else {
		variable = this.createStructure();
		variable.assign(value);
	}

	return variable;
});

/**
 * Process this node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
VariableDeclarator.setMethod(function process() {

	let name = this.getName();

	if (!name) {
		return;
	}

	this.processNodes(this.init);

	let structure = this.getResultStructure();
	let declaration = this.getParent(Protodoc.Node.VariableDeclaration);
	let scope = this.getScope();

	scope.declare(declaration.kind, this, name, structure);
});