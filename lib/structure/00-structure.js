/**
 * The Structure class
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Runtime}   runtime
 */
const Structure = Fn.inherits('Elevenways.Protodoc.Base', 'Elevenways.Protodoc.Structure', function Structure(runtime) {

	// The runtime this belongs to
	this.runtime = runtime;

	// The contents of this structure
	this.contents = new Map();

	// Extra config
	this.config = {};

	// The index where this was created
	this.index_start = null;
	this.index_end = null;

	// The type of this structure
	// Can be one of the primitive values, or object
	this.type = null;

	// The class of this structure
	this.class = null;

	// The original node
	this.original_source = null;
});

/**
 * Set a property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}                                    name        The name of the variable/property
 * @param    {Elevenways.Protodoc.Structure.Structure}   structure   The structure info
 */
Structure.setMethod(function set(name, structure) {
	this.contents.set(name, structure);
});

/**
 * Get a property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   name   The name of the variable to get
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Structure.setMethod(function get(name) {
	if (this.contents.has(name)) {
		return this.contents.get(name);
	}
});

/**
 * Assign the given structure over this one
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Structure.Structure}   source
 */
Structure.setMethod(function assign(source) {

	if (!this.original_source) {
		this.original_source = this.source;
	}

	this.config = source.config;
	this.type = source.type;
	this.class = source.class;
	this.source = source;
});