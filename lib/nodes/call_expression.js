/**
 * The CallExpression node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const CallExpression = Fn.inherits('Elevenways.Protodoc.Node.Expression', 'CallExpression');

/**
 * The `arguments` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node[]}
 */
CallExpression.setChildNodeProperty('arguments');

/**
 * The `callee` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
CallExpression.setChildNodeProperty('callee');

/**
 * Process this node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
CallExpression.setMethod(function process() {

	if (!this.arguments || !this.arguments.length) {
		return;
	}

	if (!this.callee || !this.callee.object) {
		return;
	}

	if (this.callee && this.callee.property) {

		// @TODO: this will override any property named "call" or "apply"
		if (this.callee.property.name == 'call' || this.callee.property.name == 'apply') {

			let method = this.callee.object.getResultStructure();

			if (!method) {
				return;
			}

			let target = this.arguments[0].getResultStructure();

			// Process the original Function (declaration or expression) again
			// with the target as the context
			method.value.origin.processWithContext(target);
		}
	}
});
