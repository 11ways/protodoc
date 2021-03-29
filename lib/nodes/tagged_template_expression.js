/**
 * The TaggedTemplateExpression node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const TaggedTemplateExpression = Fn.inherits('Elevenways.Protodoc.Node.CallExpression', 'TaggedTemplateExpression');

/**
 * The 'quasi' node property containing the actual template
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.TemplateLiteral}
 */
TaggedTemplateExpression.setChildNodeProperty('quasi');

/**
 * The target we're tagging
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
TaggedTemplateExpression.setChildNodeProperty('tag');

// @TODO: custom call functionality