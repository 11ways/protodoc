/**
 * The ObjectPattern node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const ObjectPattern = Fn.inherits('Elevenways.Protodoc.Node.Node', 'ObjectPattern');

/**
 * The properties being created
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
ObjectPattern.setChildNodeProperty('properties');

/**
 * Get the names this pattern should set
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Object[]}
 */
ObjectPattern.setMethod(function getNames() {

	let result = [],
	    prop,
	    type,
	    key;

	for (prop of this.properties) {

		if (prop instanceof Protodoc.Node.Property) {
			type = 'property';
			key = prop.getKey();
		} else {
			type = 'rest';
			key = prop.getKey();
		}

		if (key != null) {
			result.push({type, key});
		}
	}

	return result;
});
