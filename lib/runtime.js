const acornLoose = require('acorn-loose'),
      acorn = require('acorn');

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

	this.createGlobals();
});

/**
 * This is the runtime
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Runtime}
 */
Runtime.setProperty(function runtime() {
	return this;
});

/**
 * Create the globals
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Runtime.setMethod(function createGlobals() {

	Protodoc.Structure.Function.getGlobalFunction(this);
	Protodoc.Structure.Object.getGlobalObject(this);

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

	let comments = [],
	    program,
	    tokens;

	let options = {
		comment       : true,
		ecmaVersion   : 12,
		locations     : true,
		allowHashBang : true,
		onComment     : (block, text, start, end, start_position, end_position) => {
			// @WARN: start & end position use line & column. Line is 1-based!
			comments.push({
				block,
				text,
				start,
				end
			});
		}
	};

	try {
		// Try with the regular acorn parser first
		tokens = acorn.parse(code, options);
	} catch (err) {
		comments.length = 0;
		// If there were errors, try the error-tolerant parser
		tokens = acornLoose.parse(code, options);
	}

	tokens.source = code;
	tokens.comments = comments;

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