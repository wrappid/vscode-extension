import * as vscode from 'vscode';
import * as coreClasses from './Keys/CoreKeys';

function createMethodCompletionItem(methodName: string): vscode.CompletionItem {
    const completionItem = new vscode.CompletionItem(methodName, vscode.CompletionItemKind.Method);
    return completionItem;
}

export const keyCompletion = vscode.languages.registerCompletionItemProvider(
    ['javascript', 'typescript'],
    {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const linePrefix = document.lineAt(position).text.slice(0, position.character);
				if (!linePrefix.endsWith('CoreClasses.')) {
					return undefined;
				}
				let completionItems: any[] = [];
				if (typeof (coreClasses as any)['coreClasses'] === 'object') {
					Object.keys((coreClasses as any)['coreClasses']).forEach(function (subKey) {
						completionItems = [...completionItems, createMethodCompletionItem(subKey)];
					});
				};
				return completionItems;
        } 
    },
    '.' // Triggered whenever a '.' is being typed
);

export const subKeyCompletion = vscode.languages.registerCompletionItemProvider(
    ['javascript', 'typescript'],
    {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            const linePrefix = document.lineAt(position).text.slice(0, position.character);

            const lastIndex = linePrefix.lastIndexOf(',');
            const match = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\./);

            if (!match) {
                return undefined; // If not, return undefined
            }

            const secondMatch = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\.(\w+)\./);
            if(secondMatch) {
                return undefined; // If it does, return undefined
            }
            
            const keyName = match[1]; 
            
            let completionItems: any[] = [];
            
            if(typeof (coreClasses as any)['coreClasses'][keyName] === 'object') {
                Object.keys((coreClasses as any)['coreClasses'][keyName]).forEach((item) => {
                    completionItems = [...completionItems, createMethodCompletionItem(item)];
                });
            };
            
            return completionItems;
        } 
    },
    '.' // Triggered whenever a '.' is being typed
);
export const subSubKeyCompletion = vscode.languages.registerCompletionItemProvider(
    ['javascript', 'typescript'],
    {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            const linePrefix = document.lineAt(position).text.slice(0, position.character);

            const lastIndex = linePrefix.lastIndexOf(',');

            const secondMatch = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\.(\w+)\./);
            if(!secondMatch) {
                return undefined;
            }

            const thirdMatch = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\.(\w+)\.(\w+)/);
            if(thirdMatch) {
                return undefined;
            }
            
            const keyName = secondMatch[1];
            const subkeyName = secondMatch[2];
            
            let completionItems: any[] = [];
            
            if(typeof (coreClasses as any)['coreClasses'][keyName][subkeyName] === 'object') {
                Object.keys((coreClasses as any)['coreClasses'][keyName][subkeyName]).forEach((item) => {
                    completionItems = [...completionItems, createMethodCompletionItem(item)];
                });
            };
            
            return completionItems;
        } 
    },
    '.' // Triggered whenever a '.' is being typed
);

export const subSubSubKeyCompletion = vscode.languages.registerCompletionItemProvider(
    ['javascript', 'typescript'],
    {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            const linePrefix = document.lineAt(position).text.slice(0, position.character);
            
            const lastIndex = linePrefix.lastIndexOf(',');

            const thirdMatch = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\.(\w+)\.(\w+)\./);
            if(!thirdMatch) {
                return undefined;
            }

            const fourthMatch = linePrefix.substring(lastIndex+1,linePrefix.length).match(/CoreClasses\.(\w+)\.(\w+)\.(\w+)\.(\w+)/);
            if(fourthMatch) {
                return undefined;
            }
            
            const keyName =thirdMatch[1];
            const subkeyName = thirdMatch[2];
            const subsubkeyName = thirdMatch[3];
            
            let completionItems: any[] = [];
                    
            if(typeof (coreClasses as any)['coreClasses'][keyName][subkeyName][subsubkeyName] === 'object') {
                Object.keys((coreClasses as any)['coreClasses'][keyName][subkeyName][subsubkeyName]).forEach((item) => {
                    completionItems = [...completionItems, createMethodCompletionItem(item)];
                });
            };
            
            return completionItems;
        } 
    },
    '.' // Triggered whenever a '.' is being typed
);