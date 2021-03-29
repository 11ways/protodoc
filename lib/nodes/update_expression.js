/**
 * The UpdateExpression node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const UpdateExpression = Fn.inherits('Elevenways.Protodoc.Node.UnaryExpression', 'UpdateExpression');

/**
 * Get the result structure of this expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
UpdateExpression.setMethod(function createResultStructure() {

	let structure;

	switch (this.operator) {
		case '--':
		case '++':
			structure = this.createStructure('number');
			break;

		default:
			structure = this.createStructure('undefined');
			break;
	}

	return structure;
});
