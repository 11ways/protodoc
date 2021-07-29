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
	this.contents = this.createMap();

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

/**
 * Get a property.
 * Will look in the parent/super if it is not found
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   name   The name of the variable to get
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Prototypal.setMethod(function get(name) {
	if (this.contents.has(name)) {
		return this.contents.get(name);
	}

	if (this.context && this.context.contents && this.context.contents.has(name)) {
		return this.context.contents.get(name);
	}

	// @TODO: This is not the ideal way to do this?
	// (What about getting prototype of a string & such?)
	if (name == 'prototype') {
		return this.super;
	}

	if (this.super) {
		return this.super.getFromPrototype(name);
	}
});

/**
 * A child instance is requesting something
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   name   The name of the variable to get
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Prototypal.setMethod(function getFromPrototype(name) {

	if (this.context && this.context.contents && this.context.contents.has(name)) {
		return this.context.contents.get(name);
	}

	let prototype = this.contents.get('prototype');

	if (prototype && prototype.hasOwn(name)) {
		return prototype.get(name);
	}

	if (this.super) {
		return this.super.getFromPrototype(name);
	}
});