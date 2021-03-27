/**
 * The AssignmentPattern node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const AssignmentPattern = Fn.inherits('Elevenways.Protodoc.Node.AssignmentExpression', 'AssignmentPattern');

/**
 * The operator is always '='
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {String}
 */
AssignmentPattern.setProperty('operator', '=');

/**
 * Get the name of the target
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
AssignmentPattern.setMethod(function getTargetName() {

	if (this.left) {
		return this.left.name;
	}

});