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
 * The `hoisted` property, can only be true for Variable structures
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
Structure.setProperty('hoisted', false);

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
 * @param    {Boolean=}   create_version
 */
Structure.setMethod(function assign(source, origin, create_version) {

	if (!source) {
		return;
	}

	// Clone the current version first
	let clone = this.clone();

	if (!this.original_origin) {
		this.original_origin = this.origin;
	}

	this.contents = new Map(source.contents);
	this.config = source.config;
	this.type = source.type;
	this.class = source.class;
	this.origin = origin;

	if (origin) {
		this.index_start = origin.start;
		this.index_end = origin.end;
	}

	if (create_version || create_version == null) {
		this.history.push(clone);
	}
});

/**
 * Get the scope where this was created
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Scope.Scope}
 */
Structure.setMethod(function getScope() {

	if (!this.origin) {
		return;
	}

	return this.origin.getScope();
});


/**
 * Get the oldest version of this structure
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Structure.setMethod(function getOldest() {

	if (this.history && this.history.length) {
		return this.history[0];
	} else {
		return this;
	}

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

	if (!this.origin) {
		return this;
	}

	let result,
	    entry,
	    index = this.origin.convertPosition(position);

	if (this.index_start <= index) {
		result = this;
	} else {

		for (entry of this.history) {

			if (entry.index_start <= index) {
				result = entry;
			}
		}
	}

	let created_scope = this.getScope(),
	    position_scope = this.origin.root.getScopeAt(position);

	// If this is a hoisted variable we have to compare scopes
	if (!result && this.hoisted) {

		// If we're in the same scope we have to return `undefined`,
		// which is a variable's oldest version
		if (created_scope == position_scope) {
			return this.getOldest();
		}
	}

	if (created_scope.isParentOf(position_scope)) {
		return this;
	}

	return result;
});

/**
 * Convert this structure to a completion item
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {String}   as_identifier
 *
 * @return   {Protodoc.LspType.CompletionItem}
 */
Structure.setMethod(function toCompletionItem(as_identifier) {

	let detail = this.type;

	if (this.class) {
		detail += ' ' + this.class;
	}

	let item = {
		label  : as_identifier,
		insertText : as_identifier,
		kind   : null,
		detail : detail,
		// tags   : null,
		documentation: {
			// either markdown or plaintext
			kind: 'markdown',
			value: 'This is a `test`',
		}
	};

	if (this.constant) {
		item.kind = Protodoc.LspType.CompletionItemKind.Constant;
	} else {
		item.kind = Protodoc.LspType.CompletionItemKind.Variable;
	}

	return item;
});