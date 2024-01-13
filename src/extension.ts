//Import the UtilityClasses module.
import * as UtilityClasses from './Utility_Classes/UtilityClasses.js';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	//Create a vscode.CompletionItem object.
	
	//@param {string} elementName - The name of the element to be created.
	//@returns {vscode.CompletionItem} - The newly created vscode. CompletionItem object.
	function createCompletionItem(elementName: string): vscode.CompletionItem {
		const completionItem = new vscode.CompletionItem(elementName, vscode.CompletionItemKind.Snippet);
		// Set the insertText property of the completionItem object to the Core snippet for the element.
		completionItem.insertText = `<${elementName}>\n\t\n</${elementName}>`;
		// Return the newly created completionItem object.
		return completionItem;
	 }

	// Function to register a completion provider
	 const provideCoreCompletion = vscode.languages.registerCompletionItemProvider('javascript', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
			let completionItems = [];
		 
			// List of element names
			let elementNames = ['COREBOX', 'COREIMAGE', 'COREAVATAR'];
		 
			// Create a completion item for each element
			for (let elementName of elementNames) {
				completionItems.push(createCompletionItem(elementName));
			}
		 
			return Promise.resolve(completionItems);
		 }		 
	});
	 
	// Function to register a completion provider
	// This function will be called whenever the user types in a JavaScript file
	const simplecompletions = vscode.languages.registerCompletionItemProvider('javascript', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			// Create a new CompletionItem for 'styleClasses={[]}'
			const styleclassCompletion = new vscode.CompletionItem('styleClasses={[]}',vscode.CompletionItemKind.Property);
			// Create a new CompletionItem for 'CoreClasses'
			const commitCharacterCompletion = new vscode.CompletionItem('CoreClasses',vscode.CompletionItemKind.Method);
			// Set the commit characters for this item to '.'
       		// This means that after selecting this item, typing '.' will automatically insert it into the document
			commitCharacterCompletion.commitCharacters = ['.'];
			// Add documentation to this item
       		// This will be displayed in the hover tooltip when the user hovers over this item in the autocomplete dropdown
			commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get more options');
			// Return an array of all the CompletionItems that should be shown in the autocomplete dropdown
			return [
				styleclassCompletion,
				commitCharacterCompletion
				];
		}
	});

	// Function to register a completion provider
	// This function will be called whenever the user types in a JavaScript file
	const boilerPlate = vscode.languages.registerCompletionItemProvider('javascript', {
	// The provideCompletionItems method is called when the user triggers autocomplete (usually by pressing Ctrl+Space)
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
		
		// Create a new CompletionItem for 'wrb'
		const snippetCompletion = new vscode.CompletionItem('wrb',vscode.CompletionItemKind.Snippet);

		// Set the insertText property of the CompletionItem to a SnippetString
		// This defines the text that will be inserted into the document if the user selects this item
		// The ${TM_FILENAME_BASE} placeholder will be replaced with the base name of the current file
		snippetCompletion.insertText = new vscode.SnippetString('import {\n} from "@wrappid/core";\n\nconst \${TM_FILENAME_BASE} = () =>{\n\treturn(\n\t\t\n\t);\n};');
		
		// Create a MarkdownString for the documentation of the CompletionItem
		// This will be displayed in the hover tooltip when the user hovers over this item in the autocomplete dropdown
		const docs: any = new vscode.MarkdownString("Inserts a boilerplate snippet");
		// Assign the documentation to the CompletionItem
		snippetCompletion.documentation = docs;
		// Return an array containing the CompletionItem
		return [
			snippetCompletion
		];
	}
	});


	// Function to create a CompletionItem for a method
	// Takes the name of the method as a parameter
	function createMethodCompletionItem(methodName: string): vscode.CompletionItem {
		// Create a new CompletionItem with the given method name and set its kind to Method
		const completionItem = new vscode.CompletionItem(methodName, vscode.CompletionItemKind.Method);
		// Return the created CompletionItem
		return completionItem;
	}   
	
	// Register a completion provider for JavaScript files
	// This provider will be triggered whenever a '.' is being typed
	const coreClassesCompletion = vscode.languages.registerCompletionItemProvider(
		'javascript',
		{
			// The provideCompletionItems method is called when the user triggers autocomplete (usually by pressing Ctrl+Space)
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				// Get the text of the current line up to the cursor position
				const linePrefix = document.lineAt(position).text.slice(0, position.character);

				// If the line does not end with 'CoreClasses.', return undefined to indicate that no completions should be provided
				if (!linePrefix.endsWith('CoreClasses.')) {
					return undefined;
				}

				//Initialize an empty array to store the names of methods within the UtilityClasses module.
				let completionItems: any[] = [];

				// Iterate over the keys of the UtilityClasses module.
				if (typeof (UtilityClasses as any)['UtilityClasses'] === 'object') {
					Object.keys((UtilityClasses as any)['UtilityClasses']).forEach(function (subKey) {
						completionItems = [...completionItems, createMethodCompletionItem(subKey)];
					});
				};
				
				// Return the array of CompletionItems
				return completionItems;
			} 
		},
		'.' // Triggered whenever a '.' is being typed
	);
	


	// Register a completion item provider for JavaScript language
	const subKeyCompletion = vscode.languages.registerCompletionItemProvider(
		'javascript',
		{
			// This function provides completion items based on the current document and cursor position
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				// Get the text before the cursor in the current line
				const linePrefix = document.lineAt(position).text.slice(0, position.character);

				// Find the last occurrence of the pattern before the cursor position
				const lastIndex = linePrefix.lastIndexOf(',');
				// Check if the last occurrence matches the pattern CoreClasses.<className>.
				const match = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\./);
				// console.log('MATCH:'+match);
				if (!match) {
					return undefined; // If not, return undefined
				}
	
				// Check if the line prefix matches the pattern CoreClasses.<className>.<methodName>.
				const secondMatch = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\.(\w+)\./);
				if(secondMatch) {
					return undefined; // If it does, return undefined
				}
				
				// Extract the className from the match
				const keyName = match[1]; 
				
				// Initialize an array to hold the completion items
				let completionItems: any[] = [];
				
				// Check if the className exists in UtilityClasses
				if(typeof (UtilityClasses as any)['UtilityClasses'][keyName] === 'object') {
					// If it does, iterate over its keys and add them as completion items
					Object.keys((UtilityClasses as any)['UtilityClasses'][keyName]).forEach((item) => {
						completionItems = [...completionItems, createMethodCompletionItem(item)];
					});
				};
				
				// Return the completion items
   				return completionItems;
			} 
		},
		'.' // Triggered whenever a '.' is being typed
	);
 
	 
	// Register a completion item provider for JavaScript in VS Code
	const subSubKeyCompletion = vscode.languages.registerCompletionItemProvider(
		'javascript',
		{
			// Function to provide completion items
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				// Get the text before the cursor position
				const linePrefix = document.lineAt(position).text.slice(0, position.character);

				// Find the last occurrence of the pattern before the cursor position
				const lastIndex = linePrefix.lastIndexOf(',');

				// Check if the last occurrence matches the pattern CoreClasses.<className>.
				const match = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\./);
				
				// Match the text with the pattern CoreClasses.<class>.<method>.
				if (!match) {
					return undefined;
				}
	
				// Check if there is another method after the current one
				const secondMatch = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\.(\w+)\./);
				if(!secondMatch) {
					return undefined;
				}
	
				// Check if there is another method after the current one
				const thirdMatch = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\.(\w+)\.(\w+)/);
				if(thirdMatch) {
					return undefined;
				}
				
				// Extract the class and method names from the match
				const keyName = secondMatch[1];
				const subkeyName = secondMatch[2];
				
				console.log(keyName+subkeyName);
				// Initialize an array to store the completion items
				let completionItems: any[] = [];
				
				// Check if the method exists in the UtilityClasses object
				if(typeof (UtilityClasses as any)['UtilityClasses'][keyName][subkeyName] === 'object') {
					// For each property in the method, create a completion item
					Object.keys((UtilityClasses as any)['UtilityClasses'][keyName][subkeyName]).forEach((item) => {
						completionItems = [...completionItems, createMethodCompletionItem(item)];
					});
				};
				
				// Return the completion items
   				return completionItems;
			} 
		},
		'.' // Triggered whenever a '.' is being typed
	);
 

	// Register a new completion item provider for JavaScript in VS Code
	const subSubSubKeyCompletion = vscode.languages.registerCompletionItemProvider(
		'javascript', // Language identifier
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				// Get the text before the cursor position
				const linePrefix = document.lineAt(position).text.slice(0, position.character);
				
				const lastIndex = linePrefix.lastIndexOf(',');

				// Match the first part of the string before the cursor
				const match = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\./);
				if (!match) {
					return undefined; // If no match, return undefined
				}
	
				// Match the second part of the string before the cursor
				const secondMatch = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\.(\w+)\./);
				if(!secondMatch) {
					return undefined; // If no second match, return undefined
				}
	
				// Match the third part of the string before the cursor
				const thirdMatch = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\.(\w+)\.(\w+)\./);
				if(!thirdMatch) {
					return undefined; // If no third match, return undefined
				}
	
				// Match the fourth part of the string before the cursor
				const fourthMatch = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\.(\w+)\.(\w+)\.(\w+)/);
				if(fourthMatch) {
					return undefined; // If no fourth match, return undefined
				}
				
				// Extract the matched keys
				const keyName =thirdMatch[1];
				const subkeyName = thirdMatch[2];
				const subsubkeyName = thirdMatch[3];
				console.log(keyName+subkeyName+subsubkeyName);
				
				// Initialize an array to hold the completion items
				let completionItems: any[] = [];
						
				// Check if the matched keys exist in the UtilityClasses object
				if(typeof (UtilityClasses as any)['UtilityClasses'][keyName][subkeyName][subsubkeyName] === 'object') {
					// If they do, iterate over their properties and add them to the completion items
					Object.keys((UtilityClasses as any)['UtilityClasses'][keyName][subkeyName][subsubkeyName]).forEach((item) => {
						completionItems = [...completionItems, createMethodCompletionItem(item)];
					});
				};
				
				// Return the completion items
   				return completionItems;
			} 
		},
		'.' // Triggered whenever a '.' is being typed
	);
 

	context.subscriptions.push(boilerPlate,simplecompletions,provideCoreCompletion,coreClassesCompletion,subKeyCompletion,subSubKeyCompletion,subSubKeyCompletion);
}

export function deactivate() {}
