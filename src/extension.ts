import * as UtilityClasses from './Utility_Classes/UtilityClasses.js';
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	function createCompletionItem(elementName: string): vscode.CompletionItem {
		const completionItem = new vscode.CompletionItem(elementName, vscode.CompletionItemKind.Snippet);
		completionItem.insertText = `<${elementName}>\n\t\n</${elementName}>`;
		return completionItem;
	 }

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
	 
	 
	const simplecompletions = vscode.languages.registerCompletionItemProvider('javascript', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			const styleclassCompletion = new vscode.CompletionItem('styleClasses={[]}',vscode.CompletionItemKind.Property);
			
			
			const commitCharacterCompletion = new vscode.CompletionItem('CoreClasses',vscode.CompletionItemKind.Method);
			commitCharacterCompletion.commitCharacters = ['.'];
			commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get more options');
			
			return [
				styleclassCompletion,
				commitCharacterCompletion
				];
		}
	});

	const boilerPlate = vscode.languages.registerCompletionItemProvider('javascript', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			
			const snippetCompletion = new vscode.CompletionItem('wrb',vscode.CompletionItemKind.Snippet);

			snippetCompletion.insertText = new vscode.SnippetString('import {\n} from "@wrappid/core";\n\nconst \${TM_FILENAME_BASE} = () =>{\n\treturn(\n\t\t\n\t);\n};');
			
			const docs: any = new vscode.MarkdownString("Inserts a boilerplate snippet");
			snippetCompletion.documentation = docs;
			return [
				snippetCompletion
			];
		}
	});

	function createMethodCompletionItem(methodName: string): vscode.CompletionItem {
		const completionItem = new vscode.CompletionItem(methodName, vscode.CompletionItemKind.Method);
		return completionItem;
	}	  

	const coreClasses = vscode.languages.registerCompletionItemProvider(
		'javascript',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				const linePrefix = document.lineAt(position).text.slice(0, position.character);
				if (!linePrefix.endsWith('CoreClasses.')) {
				   return undefined;
				}
			  
				let completionItems = [];
			  
				// List of method names(replace)
				let methodNames = ['HEIGHT', 'ALIGNMENT', 'DISPLAY', 'AVATAR', 'WIDTH'];
			  
				// Create a completion item for each method
				for (let methodName of methodNames) {
					completionItems.push(createMethodCompletionItem(methodName));
				}
			  
				return completionItems;
			  }  
		},
		'.' // triggered whenever a '.' is being typed
	);

	context.subscriptions.push(boilerPlate,simplecompletions,provideCoreCompletion,coreClasses);
}

export function deactivate() {}
