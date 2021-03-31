/**
 * The ArrayPattern node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const ArrayPattern = Fn.inherits('Elevenways.Protodoc.Node.Node', 'ArrayPattern');

/**
 * The variables being created
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Identifier[]}
 */
ArrayPattern.setChildNodeProperty('elements');

/**
 * Get the names this pattern should set
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Object[]}
 */
ArrayPattern.setMethod(function getNames() {

	let result = [],
	    entry,
	    type,
	    key;

	for (entry of this.elements) {

		if (entry instanceof Protodoc.Node.Identifier) {
			type = 'identifier';
			key = entry.name;
		} else {
			type = 'rest';
			key = entry.getKey();
		}

		result.push({type, key});
	}

	return result;
});