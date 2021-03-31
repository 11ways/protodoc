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
	['structure', 'variable'],
	['structure', 'value'],
	['structure', 'property'],
	['scope', '00-scope'],
	['scope', 'local_scope'],
	['scope', 'block_scope'],
	['nodes', '00-node'],
	['nodes', '05-expression'],
	['nodes', 'block_statement'],
	['nodes', 'program'],
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
	['nodes', 'function_declaration'],
	['nodes', 'binary_expression'],
	['nodes', 'array_expression'],
	['nodes', 'object_expression'],
	['nodes', 'property'],
	['nodes', 'assignment_expression'],
	['nodes', 'assignment_pattern'],
	['nodes', 'new_expression'],
	['nodes', 'if_statement'],
	['nodes', 'try_statement'],
	['nodes', 'catch_clause'],
	['nodes', 'for_of_statement'],
	['nodes', 'for_in_statement'],
	['nodes', 'unary_expression'],
	['nodes', 'update_expression'],
	['nodes', 'switch_statement'],
	['nodes', 'switch_case'],
	['nodes', 'break_statement'],
	['nodes', 'labeled_statement'],
	['nodes', 'logical_expression'],
	['nodes', 'arrow_function_expression'],
	['nodes', 'template_literal'],
	['nodes', 'template_element'],
	['nodes', 'tagged_template_expression'],
	['nodes', 'throw_statement'],
	['nodes', 'object_pattern'],
	['nodes', 'await_expression'],
	['nodes', 'rest_element'],
	['nodes', 'continue_statement'],
	['nodes', 'empty_statement'],
	['nodes', 'for_statement'],
	['nodes', 'array_pattern'],
], options);

// @TODO: needed to force the constitutors of our classes to run.
//        maybe replace with another type of call?
Blast.doLoaded();

// Export the Protodoc namespace
module.exports = Protodoc;