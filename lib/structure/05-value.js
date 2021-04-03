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
