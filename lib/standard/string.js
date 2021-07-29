/**
 * Create the global String class
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Runtime}            runtime
 * @param    {Elevenways.Protodoc.Structure.Object}   Obj
 */
Protodoc.Runtime.onInit(function createString(runtime, Obj) {

	let Str = runtime.createFunction(false);

	let prototype = runtime.createObject();

	Str.set('prototype', prototype);
	prototype.set('constructor', Str);

	prototype.set('length', runtime.createPrimitive('number'));

	runtime.registerStandard('String', Str);
});