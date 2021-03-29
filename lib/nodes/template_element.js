/**
 * The TemplateElement node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const TemplateElement = Fn.inherits('Elevenways.Protodoc.Node.Node', 'TemplateElement');

/**
 * The cooked & raw value object
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Object}
 */
TemplateElement.linkEspreeProperty('value');

/**
 * The tail?
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Boolean}
 */
TemplateElement.linkEspreeProperty('tail');
