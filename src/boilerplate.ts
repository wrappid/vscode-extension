import * as vscode from 'vscode';

export const boilerPlate = vscode.languages.registerCompletionItemProvider('javascript', {
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