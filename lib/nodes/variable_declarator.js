/**
 * The VariableDeclarator node:
 * declaring a variable with a value
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritDoc
 */
const VariableDeclarator = Fn.inherits('Elevenways.Protodoc.Node', 'VariableDeclarator');

/**
 * The `id` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
VariableDeclarator.setChildNodeProperty('id');

/**
 * The `init` node property
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {Elevenways.Protodoc.Node.Node}
 */
VariableDeclarator.setChildNodeProperty('init');

/**
 * Get the name of the variable it's declaring
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}
 */
VariableDeclarator.setMethod(function getName() {
	if (this.id && this.id instanceof Protodoc.Node.Identifier) {
		return this.id.name;
	}
});

/**
 * Create the result structure of the declared variable
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Elevenways.Protodoc.Structure.Structure}
 */
VariableDeclarator.setMethod(function createResultStructure() {

	let variable = this.createVariable('undefined'),
	    value;

	let declaration = this.getParent(Protodoc.Node.VariableDeclaration);
	variable.kind = declaration.kind;

	if (this.init && this.init.getResultStructure) {
		value = this.init.getResultStructure();
		variable.assignInitialValue(value, this);
	}

	return variable;
});

/**
 * Process this node
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
VariableDeclarator.setMethod(function process() {

	this.processNodes(this.init);

	let name = this.getName();

	if (!name) {

		if (this.id) {
			if (this.id instanceof Protodoc.Node.ObjectPattern) {
				this.processObjectPattern();
			} else if (this.id instanceof Protodoc.Node.ArrayPattern) {
				this.processArrayPattern();
			}
		}

		return;
	}

	let structure = this.getResultStructure();
	let declaration = this.getParent(Protodoc.Node.VariableDeclaration);
	let scope = this.getScope();

	scope.declare(declaration.kind, this, name, structure);
});

/**
 * Process an ObjectPattern declaration
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
VariableDeclarator.setMethod(function processObjectPattern() {

	let names = this.id.getNames();

	if (!names || !names.length) {
		return;
	}

	let scope = this.getScope();
	let declaration = this.getParent(Protodoc.Node.VariableDeclaration);

	let init;

	if (this.init && this.init.getResultStructure) {
		init = this.init.getResultStructure();
	}

	if (init) {

		let used_keys = [],
		    new_value,
		    variable,
		    entry,
		    name;

		for (entry of names) {
			variable = this.createVariable('undefined');

			if (entry.type == 'rest') {

				new_value = this.createStandardInstance('Object');

				for (let [key, val] of init.contents) {

					if (used_keys.indexOf(key) > -1) {
						continue;
					}

					new_value.set(key, val);
				}

			} else {

				new_value = init.get(entry.key);
				used_keys.push(entry.key);
			}

			if (new_value) {
				variable.assignInitialValue(new_value);
			}

			scope.declare(declaration.kind, this, entry.key, variable);
		}
	}

});

/**
 * Process an ArrayPattern declaration
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
VariableDeclarator.setMethod(function processArrayPattern() {

	let names = this.id.getNames();

	if (!names || !names.length) {
		return;
	}

	let scope = this.getScope();
	let declaration = this.getParent(Protodoc.Node.VariableDeclaration);

	let init;

	if (this.init && this.init.getResultStructure) {
		init = this.init.getResultStructure();
	}

	if (init) {

		let new_value,
		    variable,
		    entry,
		    name,
		    i;

		for (i = 0; i < names.length; i++) {
			entry = names[i];
			variable = this.createVariable('undefined');

			if (entry.type == 'rest') {

				new_value = this.createStandardInstance('Array');

				for (let [key, val] of init.contents) {

					if (typeof key == 'number' && key >= i) {
						new_value.set(key, val);
					}
				}

			} else {
				new_value = init.get(i);
			}

			if (new_value) {
				variable.assign(new_value);
			}

			scope.declare(declaration.kind, this, entry.key, variable);
		}
	}

});