/**
 * The AssignmentExpression node:
 * assigning a value to something
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const AssignmentExpression = Fn.inherits('Elevenways.Protodoc.Node.Expression', 'AssignmentExpression');

/**
 * The `left` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
AssignmentExpression.setChildNodeProperty('left');

/**
 * The `right` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
AssignmentExpression.setChildNodeProperty('right');

/**
 * The operator used
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {String}
 */
AssignmentExpression.linkEspreeProperty('operator');

/**
 * This object creates a new context
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
AssignmentExpression.setMethod(function process() {

	let left = this.left.getResultStructure(),
	    right = this.right.getResultStructure();

	if (left) {
		left.assign(right, this);
		return;
	}

	// The left side doesn't exist yet!
	if (this.left instanceof Protodoc.Node.MemberExpression) {
		let object = this.left.getSourceObjectStructure();
		let key = this.left.getPropertyKey();

		if (key != null) {
			object.set(key, right);
		}
	} else if (this.left instanceof Protodoc.Node.Identifier) {
		let structure = this.left.getResultStructure();

		if (structure) {
			structure.assign(right, this);
		} else {
			console.log(this, this.left);
			this.registerError();
		}

	} else {
		console.error(this, this.left);
		this.registerError();
	}

});