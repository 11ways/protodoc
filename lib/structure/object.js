/**
 * The Object class
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @inheritdoc
 */
const ObjectValue = Fn.inherits('Elevenways.Protodoc.Structure.Prototypal', function Object(runtime) {
	Object.super.call(this, runtime);
});

/**
 * Make sure the base object exists in this runtime
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {Elevenways.Protodoc.Runtime}   runtime
 *
 * @return   {Elevenways.Protodoc.Structure.Object}
 */
ObjectValue.setStatic(function getGlobalObject(runtime) {

	let Obj = runtime.global_scope.get('Object');

	if (Obj) {
		return Obj;
	}

	Obj = runtime.createFunction(false);

	let prototype = runtime.createObject(null);
	Obj.set('prototype', prototype);
	prototype.set('constructor', Obj);

	runtime.global_scope.set('Object', Obj);

	Obj.set('hasOwnProperty', runtime.createFunction());
	Obj.set('isPrototypeOf', runtime.createFunction());
	Obj.set('propertyIsEnumerable', runtime.createFunction());
	Obj.set('toLocaleString', runtime.createFunction());
	Obj.set('toString', runtime.createFunction());
	Obj.set('valueOf', runtime.createFunction());

	return Obj;
});