// Get an existing Protoblast instance or create a new one
const Blast = global.__Protoblast || require('protoblast')(false);

// Get the Protodoc namespace
const Protodoc = Blast.Bound.Function.getNamespace('Elevenways.Protodoc');

// Set the argument info
Blast.arguments.Protodoc = {
	names  : ['Protodoc', 'Blast', 'Bound',      'Classes',      'Fn'],
	values : [ Protodoc,   Blast,   Blast.Bound,  Blast.Classes,  Blast.Collection.Function]
};

const options = {

	// The directory to start looking in
	pwd        : __dirname,

	// Do not allow it to be added to the client-side
	client     : false,

	// The argument configuration to use for the wrapper function
	arguments  : 'Protodoc'
};

Blast.requireAll([
	['base'],
	['runtime'],
	['structure', '00-structure'],
	['scope', '00-scope'],
	['scope', 'local_scope'],
	['scope', 'block_scope'],
	['nodes', '00-node'],
	['nodes', '05-expression'],
	['nodes', 'block_statement'],
	['nodes', 'program'],
	['nodes', 'function_declaration'],
	['nodes', 'identifier'],
	['nodes', 'literal'],
	['nodes', 'variable_declaration'],
	['nodes', 'variable_declarator'],
	['nodes', 'return_statement'],
	['nodes', 'member_expression'],
	['nodes', 'call_expression'],
	['nodes', 'expression_statement'],
	['nodes', 'this_expression'],
	['nodes', 'function_expression'],
	['nodes', 'binary_expression'],
	['nodes', 'array_expression'],
	['nodes', 'object_expression'],
	['nodes', 'property'],
	['nodes', 'assignment_expression'],
	['nodes', 'assignment_pattern'],
], options);

// @TODO: needed to force the constitutors of our classes to run.
//        maybe replace with another type of call?
Blast.doLoaded();

// Export the Protodoc namespace
module.exports = Protodoc;