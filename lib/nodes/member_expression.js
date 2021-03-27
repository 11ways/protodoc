/**
 * The MemberExpression node:
 * getting the value of a certain object
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const MemberExpression = Fn.inherits('Elevenways.Protodoc.Node.Expression', 'MemberExpression');

/**
 * The `object` node property, the "context" we should use
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
MemberExpression.setChildNodeProperty('object');

/**
 * The `property` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
MemberExpression.setChildNodeProperty('property');

/**
 * Is this an optional member expression?
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
MemberExpression.linkEspreeProperty('optional');

/**
 * Is this a computed member expression, meaning the key it uses
 * is the result of an expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
MemberExpression.linkEspreeProperty('computed');

/**
 * Get the structure of the object we're acting on
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
MemberExpression.setMethod(function getSourceObjectStructure() {
	return this.object.getResultStructure();
});

/**
 * Get the name of the property being gotten
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
MemberExpression.setMethod(function getPropertyKey() {

	let key;

	if (this.computed) {
		key = this.property.resolveToPropertyKey();
	} else {
		key = this.property.name;
	}

	return key;
});

/**
 * Get the result structure of this member expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
MemberExpression.setMethod(function getResultStructure() {

	let key;

	if (this.computed) {
		key = this.property.resolveToPropertyKey();
	} else {
		key = this.property.name;
	}

	if (key == null) {
		return;
	}

	let structure = this.getSourceObjectStructure();

	if (structure) {
		return structure.get(key);
	}
});