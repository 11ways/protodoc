Protodoc.LspType = require('vscode-languageserver-types');

/**
 * The base class for the Protodoc project
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
const Base = Fn.inherits(null, 'Elevenways.Protodoc', function Base() {});

/**
 * Create a new structure
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   structure_type
 * @param    {String=}  type
 * @param    {String=}  class_name
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Base.setMethod(function _createStructure(structure_type, type, class_name) {

	if (!this.runtime) {
		throw new Error('Unable to create structure without a runtime');
	}

	if (!Protodoc.Structure[structure_type]) {
		throw new Error('Unable to create Structure type "' + structure_type + '"');
	}

	let structure = new Protodoc.Structure[structure_type](this.runtime);

	if (type) {
		structure.type = type;
	}

	if (class_name) {
		structure.class = class_name;
	}

	if (this.start != null) {
		structure.index_start = this.start;
	}

	if (this.end != null) {
		structure.index_end = this.end;
	}

	structure.origin = this;

	return structure;
});

/**
 * Create a new structure instance
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String=}   type
 * @param    {String=}   class_name
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Base.setMethod(function createStructure(type, class_name) {
	return this._createStructure('Structure', type, class_name);
});

/**
 * Create a new variable structure
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {?String}   type
 * @param    {?String}   class_name
 *
 * @return   {Elevenways.Protodoc.Structure.Variable}
 */
Base.setMethod(function createVariable(type, class_name) {

	let variable = this._createStructure('Variable');

	let value = this.createValue(type, class_name);

	variable.assign(value);

	return variable;
});

/**
 * Create a new value structure
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {?String}   type
 * @param    {?String}   class_name
 *
 * @return   {Elevenways.Protodoc.Structure.Value}
 */
Base.setMethod(function createValue(type, class_name) {

	let value = this._createStructure('Value', type, class_name);

	return value;
});

/**
 * Create a primitive
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String=}   type
 *
 * @return   {Elevenways.Protodoc.Structure.Value}
 */
Base.setMethod(function createPrimitive(type) {

	let value = this.createValue(type);

	return value;
});

/**
 * Create a new function
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {boolean}   create_prototype
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Base.setMethod(function createFunction(create_prototype = true) {

	let fnc = this._createStructure('Function');

	if (create_prototype) {
		let prototype = this.createObject();
		fnc.set('prototype', prototype);

		// Functions always add themselves as the constructor in their prototype
		prototype.set('constructor', fnc);
	}

	return fnc;
});

/**
 * Create a new object value
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {?String}   class_name
 *
 * @return   {Elevenways.Protodoc.Structure.Variable}
 */
Base.setMethod(function createObject(class_name) {

	let result;

	if (arguments.length == 0) {
		class_name = 'Object';
	}

	if (class_name == null) {
		// Explicit empty objects
		result = this._createStructure('Object', null, 'null');
	} else {
		result = this._createStructure('Object', null, class_name);
	}

	return result;
});

/**
 * Create a new instance of a standard class
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {string}   class_name
 *
 * @return   {Elevenways.Protodoc.Structure.Prototypal}
 */
Base.setMethod(function createStandardInstance(class_name) {

	let constructor = this.runtime.stdlib.get(class_name);

	return this.createInstance(constructor);
});

/**
 * Create a new instance with the given class
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Structure.Function}   constructor
 *
 * @return   {Elevenways.Protodoc.Structure.Prototypal}
 */
Base.setMethod(function createInstance(constructor) {

	let result = this.createObject();
	result.super = constructor;

	console.log('Instance:', result, 'from constructor', constructor);

	return result;
});