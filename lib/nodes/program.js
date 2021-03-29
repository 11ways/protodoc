/**
 * The Program node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Espree.Node}                node
 */
const Program = Fn.inherits('Elevenways.Protodoc.Node.BlockStatement', function Program(node) {

	// The root node is a reference to itself
	this.root = this;

	// The source code
	this.source = node.source;

	// The source lines
	this.lines = this.source.split('\n');

	// All nodes
	this.all_nodes = [];

	Program.super.call(this, node, null);
});

/**
 * The source_type (mostly script)
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {String}
 */
Program.linkEspreeProperty('source_type', 'sourceType');

/**
 * The `body` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
Program.setChildNodeProperty('body');

/**
 * Process this node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Program.setMethod(function process() {

	this.setScope(this.createLocalScope());

	this.processNodes(this.body);
});

/**
 * Get the scope at the given position
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Object}   position
 *
 * @return   {Elevenways.Protodoc.Scope.Scope}
 */
Program.setMethod(function getScopeAt(position) {

	let node = this.getNodeAt(position);

	return node.getScope();
});
