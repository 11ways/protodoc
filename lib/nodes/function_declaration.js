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
	if (this.id) {
		return this.id.name;
	}
});

/**
 * Process this function declaration
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
FunctionDeclaration.setMethod(function process() {

	let name = this.getName();
	let owner = this.parent.getScope();

	// Create a new scope
	this.scope = this.createLocalScope();

	if (name) {

		let structure = this.createStructure('function', 'Function');
		structure.config.async = this.async;
		structure.config.generator = this.generator;

		owner.declare('function', this, name, structure);
		this.scope.declare('function', this, name, structure);
	}

	this.processNodes(this.body);

	let param,
	    identifier,
	    structure;

	for (param of this.params) {
		identifier = null;

		if (param instanceof Protodoc.Node.AssignmentPattern) {
			identifier = param.getTargetName();
		} else if (param instanceof Protodoc.Node.Identifier) {
			identifier = param.name;
		}

		console.log(identifier, param)

		if (identifier != null) {
			// @TODO: setting types from jsdoc?
			structure = param.createStructure();
			this.scope.set(identifier, structure);
			console.log(' -- ', this.scope);
		}
	}

});