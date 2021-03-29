/**
 * The RestElement node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const RestElement = Fn.inherits('Elevenways.Protodoc.Node.Node', 'RestElement');

/**
 * The properties being created
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
RestElement.setChildNodeProperty('argument');

/**
 * Get the name this rest element should set
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
RestElement.setMethod(function getKey() {

	let result;

	if (this.argument && this.argument instanceof Protodoc.Node.Identifier) {
		result = this.argument.name;
	} else {
		let name = this.argument && this.argument.constructor.name;

		throw new Error('Unable to process RestElement argument: ' + name);
	}

	return result;
});
