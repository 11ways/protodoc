/**
 * The TemplateLiteral node:
 * the backtick string literal
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const TemplateLiteral = Fn.inherits('Elevenways.Protodoc.Node.Literal', 'TemplateLiteral');

/**
 * The 'epxressions' node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
TemplateLiteral.setChildNodeProperty('expressions');

/**
 * The 'quasis' node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
TemplateLiteral.setChildNodeProperty('quasis');

/**
 * Try to create the value
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
TemplateLiteral.setProperty(function value() {

	let result = '',
	    entry;

	for (entry of this.quasis) {
		result += entry.value.cooked;
	}

	return result;
});

/**
 * Get the type of the literal
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
TemplateLiteral.setMethod(function createResultStructure() {
	return this.createStructure('string');
});