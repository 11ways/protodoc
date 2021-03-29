/**
 * The CatchClause node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const CatchClause = Fn.inherits('Elevenways.Protodoc.Node', 'CatchClause');

/**
 * The `body` node property: the actual code of this catch clause
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
CatchClause.setChildNodeProperty('body');

/**
 * The `param` node property: the parameter created in this catch
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
CatchClause.setChildNodeProperty('param');

/**
 * Process this function expression
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
CatchClause.setMethod(function process() {

	this.processNodes(this.body);

	if (this.param) {
		let param = this.param,
		    identifier,
		    structure;

		identifier = null;

		if (param instanceof Protodoc.Node.AssignmentPattern) {
			identifier = param.getTargetName();
		} else if (param instanceof Protodoc.Node.Identifier) {
			identifier = param.name;
		}

		if (identifier != null) {
			// @TODO: setting types from jsdoc?
			structure = param.createStructure();
			let scope = this.body.getScope();
			scope.set(identifier, structure);
		}
	}
});