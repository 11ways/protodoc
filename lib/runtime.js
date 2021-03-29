const espree = require('espree');

/**
 * The Runtime class
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Espree.Node}                node
 * @param    {Elevenways.Protodoc.Node}   root
 */
const Runtime = Fn.inherits('Elevenways.Protodoc.Base', 'Elevenways.Protodoc', function Runtime() {

	// The global scope
	this.global_scope = new Protodoc.Scope(this, null);

	// Scopes
	this.scopes = new Map();

	// Contexts
	this.contexts = new Map();

	// Structures
	this.structures = new Map();
});

/**
 * Parse the given code
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   code
 *
 * @return   {Elevenways.Protodoc.Node}
 */
Runtime.setMethod(function parse(code) {

	let program;

	let tokens = espree.parse(code, {
		comment     : true,
		ecmaVersion : 2020,
	});

	tokens.source = code;

	try {
		program = new Protodoc.Node.Program(tokens);
		this.process(program);
	} catch (err) {
		throw err;
	}

	return program;
});

/**
 * Process the given node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Node}   node
 */
Runtime.setMethod(function process(node) {

	// Attach this runtime to the root node
	node.runtime = this;

	node.process();
});

/**
 * Get the local scope of a node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Node}   node
 *
 * @return   {Elevenways.Protodoc.Scope.Scope}
 */
Runtime.setMethod(function getScope(node) {

	if (this.scopes.has(node)) {
		return this.scopes.get(node);
	}

	if (node.parent) {
		return node.parent.getScope();
	}

	return null;
});

/**
 * Set the local scope of a node (where `var` declarations will happen)
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Node}   node
 * @param    {Elevenways.Protodoc.Scope.Scope}
 *
 * @return   {Elevenways.Protodoc.Scope.Scope}
 */
Runtime.setMethod(function setScope(node, scope) {
	this.scopes.set(node, scope);
	return scope;
});

/**
 * Get the context of a node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Node}   node
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Runtime.setMethod(function getContext(node) {

	if (this.contexts.has(node)) {
		return this.contexts.get(node);
	}

	if (node.parent) {
		return node.parent.getContext();
	}

	return null;
});

/**
 * Set the local scope of a node (where `var` declarations will happen)
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Node}   node
 * @param    {Elevenways.Protodoc.Structure.Structure}
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Runtime.setMethod(function setContext(node, context) {
	this.contexts.set(node, context);
	return context;
});