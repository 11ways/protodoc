/**
 * The Variable class
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritdoc
 */
const Variable = Fn.inherits('Elevenways.Protodoc.Structure', function Variable(runtime) {
	Variable.super.call(this, runtime);

	// Where the current assignment happened
	this.assignment_index_start = null;
});

/**
 * Link the property to the value
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {string}   name
 */
Variable.setStatic(function linkValueProperty(name) {
	this.setProperty(name, function getValue() {
		if (this.value) {
			return this.value[name];
		}
	});
});

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

/**
 * Get the current type of this variable
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {string}
 */
Variable.linkValueProperty('type');

/**
 * Get the current class of this variable
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {string}
 */
Variable.linkValueProperty('class');

/**
 * Get the current context of this variable
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Map}
 */
Variable.linkValueProperty('context');

/**
 * Get the current contents (properties) of this variable
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Map}
 */
Variable.linkValueProperty('contents');

/**
 * Get the current config of this variable's value
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Map}
 */
Variable.linkValueProperty('config');

/**
 * Get the index where the current value was assigned
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {number}
 */
Variable.setProperty(function value_index_start() {

	if (this.assignment_index_start) {
		return this.assignment_index_start;
	}

	if (!this.value) {
		return this.index_start;
	}

	return this.value.index_start;
});

/**
 * Clone this variable
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Variable}
 */
Variable.setMethod(function clone() {

	let result = new Variable(this.runtime);

	// Store the current value
	result.value = this.value;

	result.assignment_index_start = this.assignment_index_start;
	result.index_start = this.index_start;
	result.index_end = this.index_end;
	result.original_origin = this.original_origin;
	result.history = this.history.slice(0);

	return result;
});

/**
 * Assign the given value to this variable
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Structure.Value}   value
 * @param    {Elevenways.Protodoc.Node.Node}         origin
 * @param    {Boolean=}   create_version
 */
Variable.setMethod(function assign(value, origin, create_version) {

	if (!value) {
		return;
	}

	if (create_version == null) {
		create_version = true;
	}

	let clone;

	if (this.value && create_version) {
		// Clone the current version first
		clone = this.clone();
	}

	// Store this value
	this.value = value;

	if (origin) {
		this.assignment_index_start = origin.start;
	} else {
		this.assignment_index_start = null;
	}

	if (clone) {
		this.history.push(clone);
	}
});

/**
 * Assign the given value as its initial value
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Structure.Value}   value
 * @param    {Elevenways.Protodoc.Node.Node}         origin
 */
Variable.setMethod(function assignInitialValue(value, origin) {

	if (this.kind == 'var') {
		return this.assign(value, origin);
	}

	this.assign(value, origin, false);

	this.history.length = 0;
});

/**
 * Get the version of this variable at the given position
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Types.Position}  position
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
Variable.setMethod(function at(position) {

	if (!this.origin) {
		return this;
	}

	let result,
	    entry,
	    index = this.origin.convertPosition(position);

	if (this.value_index_start <= index) {
		result = this;
	} else {

		for (entry of this.history) {
			if (entry.value_index_start <= index) {
				result = entry;
			}
		}

		if (!result && index >= this.index_start) {
			return this.history[0] || this;
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