/**
 * The Prototypal structure
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritdoc
 */
const Prototypal = Fn.inherits('Elevenways.Protodoc.Structure.Value', function Prototypal(runtime) {
	Prototypal.super.call(this, runtime);

	// The contents of this prototypal value
	this.contents = new Map();

	// The super property, commonly named __proto__ in JavaScript
	this.super = null;
});

/**
 * Prototypal things are mostly objects (except for Functions);
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {string}
 */
Prototypal.setProperty('type', 'object');
