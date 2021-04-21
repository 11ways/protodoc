/**
 * Create the global array class
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Runtime}            runtime
 * @param    {Elevenways.Protodoc.Structure.Object}   Obj
 */
Protodoc.Runtime.onInit(function createArray(runtime, Obj) {

	let Arr = runtime.createFunction(false);

	let prototype = runtime.createObject();

	Arr.set('prototype', prototype);
	prototype.set('constructor', Arr);

	prototype.set('length', runtime.createPrimitive('number'));

	runtime.registerStandard('Array', Arr);
});