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

	let variable = this._createStructure('Variable', type, class_name);

	return variable;
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

Protodoc.LspType = require('vscode-languageserver-types');