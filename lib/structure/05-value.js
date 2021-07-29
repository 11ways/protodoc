/**
 * The Value class:
 * parent class of Objects, Functions, primitives...
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritdoc
 */
const Value = Fn.inherits('Elevenways.Protodoc.Structure', function Value(runtime) {
	Value.super.call(this, runtime);

	// Extra config
	this.config = {};
});

/**
 * Get properties (meant for primitives)
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {this}
 */
Value.setMethod(function get(key) {

	// If this is a primitive, immediately go to the super's prototype
	if (this.type && this.super) {
		return this.super.getFromPrototype(key);
	}

	return get.super.call(this, key);
});

/**
 * Get itself
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {this}
 */
Value.setMethod(function getValue() {
	return this;
});