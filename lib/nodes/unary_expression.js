/**
 * The UnaryExpression node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const UnaryExpression = Fn.inherits('Elevenways.Protodoc.Node.Expression', 'UnaryExpression');

/**
 * The operator
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {String}
 */
UnaryExpression.linkEspreeProperty('operator');

/**
 * If the operator is before or after the argument
 * (Always true for unary, can be false for update expression like ++)
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
UnaryExpression.linkEspreeProperty('prefix');

/**
 * The 'argument' node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
UnaryExpression.setChildNodeProperty('argument');

/**
 * Get the result structure of this expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
UnaryExpression.setMethod(function createResultStructure() {

	let structure;

	switch (this.operator) {
		case 'delete':
		case '!':
			structure = this.createStructure('boolean');
			break;

		case '+':
		case '-':
		case '~':
			structure = this.createStructure('number');
			break;

		case 'typeof':
			structure = this.createStructure('string');
			break;

		case 'void':
		default:
			structure = this.createStructure('undefined');
			break;
	}

	return structure;
});
