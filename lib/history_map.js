/**
 * A Map implementation that keeps track of key-values and their history
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
const HistoryMap = Fn.inherits('Elevenways.Protodoc.Base', function HistoryMap() {

	this.runtime = null;

	// The actual values
	this.values = new Map();
});

/**
 * Remove all values from a specific origin
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {*}   origin
 */
HistoryMap.setMethod(function removeOrigin(origin) {

	let entry,
	    i;

	for (const [key, keyvalues] of this.values) {
		for (i = keyvalues.length - 1; i >= 0; i--) {
			entry = keyvalues[i];

			if (entry.origin === origin) {
				keyvalues.splice(i, 1);
			}
		}
	}

});

/**
 * Set a key-value for a specific origin
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {*}   key
 * @param    {*}   value
 * @param    {*}   origin
 */
HistoryMap.setMethod(function set(key, value, origin) {

	let keyvalues = this.values.get(key),
	    do_set = false;

	if (!keyvalues) {
		keyvalues = [];
		do_set = true;
	}

	keyvalues.unshift({value, origin});

	if (do_set) {
		this.values.set(key, keyvalues);
	}
});

/**
 * Get the key-value
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {*}   key
 */
HistoryMap.setMethod(function get(key) {

	let keyvalues = this.values.get(key);

	if (keyvalues && keyvalues[0]) {
		return keyvalues[0].value;
	}
});

/**
 * Is the given key available?
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @param    {*}   key
 *
 * @return   {boolean}
 */
HistoryMap.setMethod(function has(key) {

	let keyvalues = this.values.get(key);

	if (keyvalues && keyvalues.length) {
		return true;
	}

	return false;
});

/**
 * Iterator
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 */
HistoryMap.setMethod(Symbol.iterator, function* iterator() {
	for (const key of this.values.keys()) {
		yield [key, this.get(key)];
	}
});

/**
 * Create a clone
 *
 * @author   Jelle De Loecker   <jelle@elevenways.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {Protodoc.HistoryMap}
 */
HistoryMap.setMethod(function clone() {

	let map = this.createMap();

	map.values = new Map(this.values);

	return map;
});