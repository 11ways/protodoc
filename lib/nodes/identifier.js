/**
 * The Identifier node:
 * the name of something
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const Identifier = Fn.inherits('Elevenways.Protodoc.Node', 'Identifier');

/**
 * The name of this identifier
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {String}
 */
Identifier.linkEspreeProperty('name');

/**
 * Get the result structure this identifier is pointing to
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Identifier.setMethod(function getResultStructure() {
	let scope = this.getScope();
	return scope.get(this.name);
});

/**
 * Try to evaluate this to its actual value
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
Identifier.setMethod(function evaluate() {

	let result = this.getResultStructure();

	if (result && result.source) {
		return result.source.resolveToPropertyKey();
	}
});

/**
 * Attempt to get the evaluated value of this node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
Identifier.setMethod(function resolveToPropertyKey() {
	return this.evaluate();
});