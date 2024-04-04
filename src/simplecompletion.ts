import * as vscode from 'vscode';
export const simplecompletions = vscode.languages.registerCompletionItemProvider(['javascript', 'typescript'], {

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
        const styleClass='styleClasses={[]}';
        const styleclassCompletion = new vscode.CompletionItem(styleClass,vscode.CompletionItemKind.Property);
        styleclassCompletion.insertText=new vscode.SnippetString('styleClasses={[$0]}');

        const coreCompletion = new vscode.CompletionItem('CoreClasses',vscode.CompletionItemKind.Method);
        coreCompletion.documentation = new vscode.MarkdownString('Press `.` to get more options');
        coreCompletion.commitCharacters = ['.'];
        
        return [
            styleclassCompletion,
            coreCompletion
        ];
    }
});