import * as vscode from 'vscode';
// Function to register a completion provider
	// This function will be called whenever the user types in a JavaScript file
export const simplecompletions = vscode.languages.registerCompletionItemProvider(['javascript', 'typescript'], {

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
        // Create a new CompletionItem for 'styleClasses={[]}'
        const styleClass='styleClasses={[]}';
        const styleclassCompletion = new vscode.CompletionItem(styleClass,vscode.CompletionItemKind.Property);
        styleclassCompletion.insertText=new vscode.SnippetString('styleClasses={[$0]}');
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