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

	// The origin of this structure
	this.origin = null;

	// The original node
	this.original_origin = null;

	// Previous versions of this structure
	this.history = [];
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
 * Clone this structure
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Structure.setMethod(function clone() {

	let result = new Structure(this.runtime);

	// Clone the contents
	result.contents = new Map(this.contents);

	// Clone the config
	result.config = Blast.Collection.JSON.clone(this.config);

	result.index_start = this.index_start;
	result.index_end = this.index_end;
	result.type = this.type;
	result.class = this.class;
	result.original_origin = this.original_origin;
	result.history = this.history.slice(0);

	return result;
});

/**
 * Assign the given structure over this one
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Structure.Structure}   source
 * @param    {Elevenways.Protodoc.Node.Node}             origin
 */
Structure.setMethod(function assign(source, origin) {

	// Clone the current version first
	let clone = this.clone();

	if (!this.original_origin) {
		this.original_origin = this.origin;
	}

	this.config = source.config;
	this.type = source.type;
	this.class = source.class;
	this.origin = origin;

	if (origin) {
		this.index_start = origin.start;
		this.index_end = origin.end;
	}

	this.history.push(clone);
});

/**
 * Get the version of this structure at the given position
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Types.Position}  position
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Structure.setMethod(function at(position) {

	let result,
	    entry,
	    index = this.origin.convertPosition(position);

	if (this.index_start <= index) {
		return this;
	}

	for (entry of this.history) {

		if (entry.index_start <= index) {
			result = entry;
		}
	}

	return result;
});