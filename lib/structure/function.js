/**
 * The Function structure
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritdoc
 */
const FunctionValue = Fn.inherits('Elevenways.Protodoc.Structure.Prototypal', function Function(runtime) {
	Function.super.call(this, runtime);
});

/**
 * Functions are their own type
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {string}
 */
FunctionValue.setProperty('type', 'function');

/**
 * Functions are always of the class Function
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @type     {string}
 */
FunctionValue.setProperty('class', 'Function');

/**
 * Make sure the base object exists in this runtime
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
FunctionValue.setStatic(function getGlobalFunction(runtime) {

	let Fnc = runtime.global_scope.get('Function');

	if (Fnc) {
		return Fnc;
	}

	Fnc = new FunctionValue(runtime);

	runtime.global_scope.set('Function', Fnc);

	let prototype = new FunctionValue(runtime);
	Fnc.set('prototype', prototype);
	prototype.set('constructor', Fnc);

	prototype.set('length', runtime.createPrimitive('number'));
	prototype.set('name', runtime.createPrimitive('string'));

	// The Function's prototype & __proto__ is the same
	Fnc.super = prototype;

	return Fnc;
});