/**
 * The Scope class
 *
 * @extends  Elevenways.Protodoc.Structure.Structure
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Runtime}      runtime
 * @param    {Elevenways.Protodoc.Scope.Scope}  parent
 */
const Scope = Fn.inherits('Elevenways.Protodoc.Structure.Structure', 'Elevenways.Protodoc.Scope', function Scope(runtime, parent) {

	Scope.super.call(this, runtime);

	this.parent = parent;
});

/**
 * Declare a variable
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}                                    kind       The kind of declaration
 * @param    {Elevenways.Protodoc.Node}                  node       The declaring node
 * @param    {String}                                    name       The name of the variable
 * @param    {Elevenways.Protodoc.Structure.Structure}   structure  The structure info
 */
Scope.setMethod(function declare(kind, node, name, structure) {

	let scope = this;

	if (kind == 'let' || kind == 'const') {
		// Current scope is always fine!
	} else {
		// Vars need a local scope, not a block scope
		while (scope instanceof Protodoc.Scope.Block) {
			scope = scope.parent;
		}
	}

	if (kind == 'const') {
		structure.constant = true;
	}

	scope.set(name, structure);
});

/**
 * Get all variables in this scope
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Object}   target
 *
 * @return   {Object}
 */
Scope.setMethod(function getAll(target) {

	if (!target) {
		target = {};
	}

	if (this.parent) {
		this.parent.getAll(target);
	}

	let value,
	    key;

	for ([key, value] of this.contents) {
		target[key] = value;
	}

	return target;
});

/**
 * Get a variable
 * (Scopes will look in their parent scopes)
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   name   The name of the variable to get
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Scope.setMethod(function get(name) {

	let result = get.super.call(this, name);

	if (!result && this.parent) {
		result = this.parent.get(name);
	}

	return result;
});
