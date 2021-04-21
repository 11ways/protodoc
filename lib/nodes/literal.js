/**
 * The Literal node:
 * a literal value
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const Literal = Fn.inherits('Elevenways.Protodoc.Node.Expression', 'Literal');

/**
 * The raw string value
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {String}
 */
Literal.linkEspreeProperty('raw');

/**
 * The actual value
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {String}
 */
Literal.linkEspreeProperty('value');

/**
 * Get the type of the literal
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Literal.setMethod(function createResultStructure() {

	let value = this.value,
	    type = typeof value;

	if (value == null && type == 'object') {
		type = 'null';
	}

	return this.createPrimitive(type);
});

/**
 * Get the value of this literal
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
Literal.setMethod(function evaluate() {
	return this.value;
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
Literal.setMethod(function resolveToPropertyKey() {
	return this.evaluate();
});