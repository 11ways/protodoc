/**
 * The NewExpression node:
 * creating an instance of something
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const NewExpression = Fn.inherits('Elevenways.Protodoc.Node.Expression', 'NewExpression');

/**
 * The value that's being instantiated
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
NewExpression.setChildNodeProperty('callee');

/**
 * The arguments that are passed to the constructor
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
NewExpression.setChildNodeProperty('arguments');

/**
 * Get the structure of what is being instantiated
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
NewExpression.setMethod(function createResultStructure() {

	// Get the structure of what we're creating an instance of
	let structure = this.callee.getResultStructure(),
	    class_name,
	    type = 'object';

	if (!structure) {
		return this.createInstance();
	}

	let constructor = structure.getValue();

	// if (structure && structure.source && structure.source.id) {
	// 	class_name = structure.source.id.name;
	// }

	return this.createInstance(constructor);
});

/**
 * Process this node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
NewExpression.setMethod(function process() {

	this.processNodes(this.callee);
	this.processNodes(this.arguments);

});