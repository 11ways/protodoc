/**
 * The Variable class
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritdoc
 */
const Variable = Fn.inherits('Elevenways.Protodoc.Structure', 'Variable');

/**
 * How this variable was declared:
 * val, let or const
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {String}
 */
Variable.setProperty('kind', null);

/**
 * If this is declared using `var` or a function statement,
 * then it should be true
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
Variable.setProperty(function hoisted() {

	if (this.kind == 'var' || this.kind == 'function') {
		return true;
	}

	return false;
});
