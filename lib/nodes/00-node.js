const RUNTIME = Symbol('runtime');

/**
 * The base Protodoc node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Espree.Node}                node
 * @param    {Elevenways.Protodoc.Node}   root
 */
const Node = Fn.inherits('Elevenways.Protodoc.Base', 'Elevenways.Protodoc.Node', function Node(node, parent, root) {

	// The root "Program" node
	if (root) {
		this.root = root;
		this.parent = parent;
	} else {
		// The currently attached runtime
		// (only the root node has this)
		this[RUNTIME] = null;
		this.parent = null;
	}

	// The source Espree/Acorn node
	this.enode = node;

	this.parse();
});

/**
 * Link properties to the Espree.Node instance
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   name
 * @param    {String}   target
 */
Node.setStatic(function linkEspreeProperty(name, target) {

	if (!target) {
		target = name;
	}

	this.setProperty(name, function getEspreeProperty() {
		return this.enode[target];
	});
});

/**
 * Set the properties that contain child nodes
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   name
 */
Node.setStatic(function setChildNodeProperty(name) {
	this.constitute(function addChildNodeProperty() {
		if (!this.child_node_properties) {
			this.child_node_properties = [];
		}

		this.child_node_properties.push(name);
	});
});

/**
 * The start index
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Number}
 */
Node.linkEspreeProperty('start');

/**
 * The end index
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Number}
 */
Node.linkEspreeProperty('end');

/**
 * Get the current attached runtime
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Runtime}
 */
Node.setProperty(function runtime() {

	if (this.root && this.root != this) {
		return this.root.runtime;
	}

	return this[RUNTIME];
}, function setRuntime(runtime) {

	if (this.root && this.root != this) {
		throw new Error('Non-root nodes can not have a runtime');
	}

	this[RUNTIME] = runtime;
});

/**
 * Parse the given nodes
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Espree.Node[]}   children
 *
 * @return   {Elevenways.Protodoc.Node.Node[]}
 */
Node.setMethod(function parseChildNodes(children) {

	if (!children || !children.length) {
		return [];
	}

	let result = [],
	    Class,
	    entry,
	    child;

	for (entry of children) {
		Class = Protodoc.Node[entry.type];

		if (!Class) {
			console.error('Failed to process', entry.type, entry);
			throw new Error('Failed to get node "' + entry.type + '"');
		}

		child = new Class(entry, this, this.root);
		result.push(child);

		this.root.all_nodes.push(child);
	}

	return result;
});

/**
 * Parse the given node(s) but return only 1
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {|Espreee.Node|Espree.Node[]}   child
 *
 * @return   {Elevenways.Protodoc.Node.Node[]}
 */
Node.setMethod(function parseChildNode(child) {

	if (!child) {
		return null;
	}

	if (!Array.isArray(child)) {
		child = [child];
	}

	return this.parseChildNodes(child)[0];
});

/**
 * Get the global scope
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Scope.Scope}
 */
Node.setMethod(function getGlobalScope() {
	return this.runtime.global_scope;
});

/**
 * Get the scope this node is in
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Scope.Scope}
 */
Node.setMethod(function getScope() {
	return this.runtime.getScope(this);
});

/**
 * Set the local scope of a node (where `var` declarations will happen)
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Scope.Scope}
 *
 * @return   {Elevenways.Protodoc.Scope.Scope}
 */
Node.setMethod(function setScope(scope) {
	return this.runtime.setScope(this, scope);
});

/**
 * Create a new local scope
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Scope.Local}
 */
Node.setMethod(function createLocalScope() {

	let parent_scope;

	if (this.parent) {
		parent_scope = this.parent.getScope();
	}

	if (!parent_scope) {
		parent_scope = this.runtime.global_scope;
	}

	let scope = new Protodoc.Scope.Local(this.runtime, parent_scope);

	if (this.start != null) {
		scope.index_start = this.start;
	}

	if (this.end != null) {
		scope.index_end = this.end;
	}

	return scope;
});

/**
 * Create a new block scope
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Scope.Block}
 */
Node.setMethod(function createBlockScope() {

	let parent_scope;

	if (this.parent) {
		parent_scope = this.parent.getScope();
	}

	if (!parent_scope) {
		parent_scope = this.runtime.global_scope;
	}

	let scope = new Protodoc.Scope.Block(this.runtime, parent_scope);

	if (this.start != null) {
		scope.index_start = this.start;
	}

	if (this.end != null) {
		scope.index_end = this.end;
	}

	return scope;
});

/**
 * Create a new context
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Node.setMethod(function createContext() {

	let context = this.createStructure('object');

	return context;
});

/**
 * Get the structure this node is working on
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Node.setMethod(function getWorkingStructure() {

	if (this.parent) {
		return this.parent.getWorkingStructure();
	}

	return null;
});

/**
 * Get the context structure this node is working on
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Node.setMethod(function getContext() {
	return this.runtime.getContext(this);
});

/**
 * Get the context structure this node is working on
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Node.setMethod(function setContext(structure) {
	return this.runtime.setContext(this, structure);
});

/**
 * Get the structure of the result of this expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Node.setMethod(function getResultStructure() {

	if (!this.runtime) {
		throw new Error('Unable to get a result structure without a runtime');
	}

	if (this.runtime.structures.has(this)) {
		return this.runtime.structures.get(this);
	}

	let result;

	if (this.createResultStructure) {
		result = this.createResultStructure();
	}

	this.runtime.structures.set(this, result);

	return result;
});

/**
 * Process the contents of this node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Node.setMethod(function process() {

	if (!this.constructor.child_node_properties) {
		return;
	}

	let name,
	    nodes;

	for (name of this.constructor.child_node_properties) {
		nodes = this[name];

		if (nodes) {
			this.processNodes(nodes);
		}
	};
});

/**
 * Process child nodes
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Node.Node[]}   nodes
 */
Node.setMethod(function processNodes(nodes) {

	if (!nodes) {
		return;
	}

	if (nodes && nodes instanceof Node) {
		return nodes.process();
	}

	if (!nodes.length) {
		return;
	}

	let node;

	for (node of nodes) {
		node.process();
	}
});

/**
 * Get a parent node (of a specific type)
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Function}   type
 *
 * @return   {Elevenways.Protodoc.Node.Node}
 */
Node.setMethod(function getParent(type) {

	if (!this.parent) {
		return;
	}

	if (!type) {
		return this.parent;
	}

	if (this.parent.constructor == type) {
		return this.parent;
	}

	return this.parent.getParent(type);
});

/**
 * Perform the given function on each child
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Function}   fnc
 */
Node.setMethod(function eachChild(fnc) {

	if (!this.constructor.child_node_properties) {
		return;
	}

	let name,
	    child;

	for (name of this.constructor.child_node_properties) {

		child = this[name];

		if (child) {
			if (Array.isArray(child)) {
				let sub_child;

				for (sub_child of child) {
					fnc(sub_child);
				}
			} else {
				fnc(child);
			}
		}
	}
});

/**
 * Get the node at the given position
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Object}   position
 *
 * @return   {Elevenways.Protodoc.Node.Node}
 */
Node.setMethod(function getNodeAt(position) {

	let line_index,
	    char_index;

	if (arguments.length == 2) {
		line_index = arguments[0];
		char_index = arguments[1];
	} else {
		line_index = position.line;
		char_index = position.character;
	}

	return this.getNodeAtLineChar(line_index, char_index);
});

/**
 * Convert a position to an index
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Object}   position
 *
 * @return   {Number}
 */
Node.setMethod(function convertPosition(position) {

	let line_index,
	    char_index;

	if (typeof position == 'object') {
		line_index = position.line;
		char_index = position.character;
	} else if (arguments.length == 2) {
		line_index = arguments[0];
		char_index = arguments[1];
	} else {
		throw new Error('Unable to parse position');
	}

	if (char_index == null) {
		char_index = 0;
	}

	let lines = this.root.lines.slice(0, line_index),
	    index = char_index,
	    line;

	for (line of lines) {
		index += line.length + 1;
	}

	return index;
});

/**
 * Get the node at the given line & character
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Number}   line_index
 * @param    {Number}   char_index
 *
 * @return   {Elevenways.Protodoc.Node.Node}
 */
Node.setMethod(function getNodeAtLineChar(line_index, char_index) {

	let index = this.convertPosition(line_index, char_index);

	return this.getNodeAtIndex(index);
});

/**
 * Get the node at the given position
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Number}   index
 *
 * @return   {Elevenways.Protodoc.Node.Node}
 */
Node.setMethod(function getNodeAtIndex(index) {

	if (index >= this.start && index <= this.end) {

		let child;

		this.eachChild(entry => {
			let result = entry.getNodeAtIndex(index);

			if (result) {
				child = result;
			}
		});

		if (child) {
			return child;
		}

		return this;
	}

});

/**
 * Parse the contents of this node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Node.setMethod(function parse() {

	let properties = this.constructor.child_node_properties;

	if (!properties || !properties.length) {
		return;
	}

	let nodes,
	    key;

	for (key of properties) {
		nodes = this.enode[key];

		if (!nodes) {
			continue;
		}

		if (Array.isArray(nodes)) {
			this[key] = this.parseChildNodes(nodes);
		} else {
			this[key] = this.parseChildNode(nodes);
		}
	}
});

/**
 * Attempt to get the evaluated value of this node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {*}
 */
Node.setMethod(function resolveToPropertyKey() {
	return null;
});