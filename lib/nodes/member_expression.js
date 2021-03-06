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

	let result,
	    key;

	if (this.computed) {
		key = this.property.resolveToPropertyKey();
	} else {
		key = this.property.name;
	}

	if (key != null) {

		let structure = this.getSourceObjectStructure();

		if (structure) {
			result = structure.get(key);
		}
	}

	// Don't create it if it doesn't exist yet,
	// the nodes using this should do that
	// if (!result) {
	// 	result = getResultStructure.super.call(this);
	// }

	return result;
});

/**
 * Get code completion results
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.LspType.Position}   position
 *
 * @return   {Array}
 */
MemberExpression.setMethod(function getCompletionList(position) {

	let object = this.getSourceObjectStructure();

	if (!object) {
		return;
	}

	let items = [];

	addCompletionItems(object, items);

	let result = {
		// When lists are incomplete, further typing will request recomputes
		isIncomplete : false,

		// The actual items
		items        : items,
	};

	return result;
});

/**
 * Add completion items from an object to the items array
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Structure}   object
 * @param    {Array}
 */
function addCompletionItems(object, items) {

	let structure,
	    item,
	    key;

	if (!items.seen) {
		items.seen = {};
	}

	if (object.contents) {
		for ([key, structure] of object.contents) {

			console.log('KEY:', key);

			if (!structure) {
				continue;
			}

			if (items.seen[key]) {
				continue;
			}

			items.seen[key] = true;

			item = structure.toCompletionItem(key);

			item.kind = Protodoc.LspType.CompletionItemKind.Property;

			items.push(item);
		}
	}

	if (object.super) {
		addSuperCompletionItems(object.super, items);
		return;
	}
}

function addSuperCompletionItems(object, items) {

	if (object.context) {
		addCompletionItems(object.context, items);
	}

	if (object.contents) {
		let prototype = object.contents.get('prototype');
		addCompletionItems(prototype, items);
	}
}