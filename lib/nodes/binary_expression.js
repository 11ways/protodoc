/**
 * The BinaryExpression node:
 * performing an operation using 2 arguments
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const BinaryExpression = Fn.inherits('Elevenways.Protodoc.Node.Expression', 'BinaryExpression');

/**
 * The operator
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {String}
 */
BinaryExpression.linkEspreeProperty('operator');

/**
 * The `left` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
BinaryExpression.setChildNodeProperty('left');

/**
 * The `right` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
BinaryExpression.setChildNodeProperty('right');

/**
 * Get the result structure of this expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
BinaryExpression.setMethod(function createResultStructure() {

	let structure;

	switch (this.operator) {
		case '-':
		case '/':
		case '/':
		case '**':
			structure = this.createStructure('number');
	}

	if (!structure) {

		let left = this.left.getResultStructure() || false,
		    right = this.right.getResultStructure() || false;

		let type;

		if (left.type == 'string' || right.type == 'string') {
			structure = this.createStructure('string');
		}

		if (!structure && left.type == 'number' && right.type == 'number') {
			structure = this.createStructure('number');
		}
	}

	// @TODO: more stuff!

	return structure;
});

/**
 * Try to evaluate this expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
BinaryExpression.setMethod(function evaluate() {

	let left = this.left.resolveToPropertyKey(),
	    right = this.right.resolveToPropertyKey();

	switch (this.operator) {
		case '+':
			return left + right;

		case '-':
			return left - right;

		case '/':
			return left / right;

		case '*':
			return left * right;

		case '%':
			return left % right;
	}

});

/**
 * Attempt to get the evaluated value of this node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
BinaryExpression.setMethod(function resolveToPropertyKey() {
	return this.evaluate();
});