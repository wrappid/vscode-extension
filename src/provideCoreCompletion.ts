import * as vscode from 'vscode';
import * as CoreComponents from './Keys/Keys.js';
// import { CoreComponents } from "keys-completion";
// const {CoreComponents} = require("keys-completion/keys.js");

function createCompletionItem(elementName: string): vscode.CompletionItem {
	const completionItem = new vscode.CompletionItem(elementName, vscode.CompletionItemKind.Snippet);
	// Set the insertText property of the completionItem object to the Core snippet for the element.
	completionItem.insertText = `<${elementName}>\n\t\n</${elementName}>`;
	// Return the newly created completionItem object.
	return completionItem;
}
	
export const provideCoreCompletion = vscode.languages.registerCompletionItemProvider(['javascript', 'typescript'], {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
		let completionItems: any[] = [];

		// Iterate over the keys of the UtilityClasses module.
		Object.keys((CoreComponents as any)['CoreComponents']).forEach(function (elementName) {
			completionItems.push(createCompletionItem(elementName));
		});
		return Promise.resolve(completionItems);
	 }		 
});