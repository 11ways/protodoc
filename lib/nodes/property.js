/**
 * The Property node:
 * creating a property in an object
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const Property = Fn.inherits('Elevenways.Protodoc.Node.Node', 'Property');

/**
 * The `key` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
Property.setChildNodeProperty('key');

/**
 * The `value` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
Property.setChildNodeProperty('value');

/**
 * The kind of declaration:
 * `init` or ...
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {String}
 */
Property.linkEspreeProperty('kind');

/**
 * Is this a method?
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
Property.linkEspreeProperty('method');

/**
 * Does this use the shorthand?
 * (Key is the same as the name of the value to use)
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
Property.linkEspreeProperty('shorthand');

/**
 * Is this a computed property, meaning its key name
 * is the result of an expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
Property.linkEspreeProperty('computed');

/**
 * Get the name of the property it's creating
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
Property.setMethod(function getKey() {

	let key;

	if (this.computed) {
		key = this.key.resolveToPropertyKey();
	} else {
		key = this.key.name;
	}

	return key;
});

/**
 * Create the result structure of the declared property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Property.setMethod(function createResultStructure() {

	if (this.value && this.value.getResultStructure) {
		return this.value.getResultStructure();
	}

	return this.createStructure('undefined');
});

/**
 * Process this node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Property.setMethod(function process() {

	this.processNodes(this.value);

	let key = this.getKey();

	if (key == null) {
		return;
	}

	let structure = this.getResultStructure();
	let context = this.getContext();

	context.set(key, structure);
});