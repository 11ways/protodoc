/**
 * The FunctionExpression node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const FunctionExpression = Fn.inherits('Elevenways.Protodoc.Node.Expression', 'FunctionExpression');

/**
 * Functions can create contexts
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
FunctionExpression.setProperty('creates_context', true);

/**
 * Is this an async function?
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
FunctionExpression.linkEspreeProperty('async');

/**
 * Is this a generator?
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
FunctionExpression.linkEspreeProperty('generator');

/**
 * The `id` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
FunctionExpression.setChildNodeProperty('id');

/**
 * The `body` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
FunctionExpression.setChildNodeProperty('body');

/**
 * The `params` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
FunctionExpression.setChildNodeProperty('params');

/**
 * Get the name of this function
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
FunctionExpression.setMethod(function getName() {
	if (this.id) {
		return this.id.name;
	}
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
FunctionExpression.setMethod(function createResultStructure() {

	let structure = this.createFunction();

	structure.config.async = this.async;
	structure.config.generator = this.generator;
	structure.context = this.getContext();

	return structure;
});

/**
 * Process this function expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
FunctionExpression.setMethod(function process() {

	let name = this.getName();

	// Functions always create a new local scope
	let scope = this.createLocalScope();

	if (this.creates_context) {
		let context = this.createContext();
		this.setContext(context);
	}

	// Named functions always create a reference to themselves in their own scope
	if (name) {
		let structure = this.getResultStructure();
		scope.declare('function', this, name, structure);
	}

	// Only set the scope on the body
	this.body.setScope(scope);

	if (this.body) {
		if (this.body.processWithExistingScope) {
			this.body.processWithExistingScope();
		} else {
			// @TODO: Arrow functions sometimes only have an expression
		}
	}

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

		if (identifier != null) {
			// @TODO: setting types from jsdoc?
			structure = param.createVariable('undefined');
			scope.set(identifier, structure);
		}
	}

});