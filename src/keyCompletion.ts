import * as vscode from 'vscode';
import * as UtilityClasses from './Keys/Keys.js';
// import {keys} from 'keys/'
// import { UtilityClasses } from "keys-completion";


function createMethodCompletionItem(methodName: string): vscode.CompletionItem {
    // Create a new CompletionItem with the given method name and set its kind to Method
    const completionItem = new vscode.CompletionItem(methodName, vscode.CompletionItemKind.Method);
    // Return the created CompletionItem
    return completionItem;
}
export const subKeyCompletion = vscode.languages.registerCompletionItemProvider(
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
export const subSubKeyCompletion = vscode.languages.registerCompletionItemProvider(
    'javascript',
    {
        // Function to provide completion items
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            // Get the text before the cursor position
            const linePrefix = document.lineAt(position).text.slice(0, position.character);

            // Find the last occurrence of the pattern before the cursor position
            const lastIndex = linePrefix.lastIndexOf(',');

            // Check if the last occurrence matches the pattern CoreClasses.<className>.

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
export const subSubSubKeyCompletion = vscode.languages.registerCompletionItemProvider(
    'javascript', // Language identifier
    {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            // Get the text before the cursor position
            const linePrefix = document.lineAt(position).text.slice(0, position.character);
            
            const lastIndex = linePrefix.lastIndexOf(',');


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