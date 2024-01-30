import {provideCoreCompletion} from './provideCoreCompletion.js';
import {simplecompletions} from './simplecompletion.js';
import {keyCompletion,subKeyCompletion,subSubKeyCompletion,subSubSubKeyCompletion} from './keyCompletion.js';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(simplecompletions,provideCoreCompletion,keyCompletion,subKeyCompletion,subSubKeyCompletion,subSubSubKeyCompletion);
}

export function deactivate() {}
