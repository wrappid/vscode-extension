import {provideCoreCompletion} from './provideCoreCompletion.js';
import {simplecompletions} from './simplecompletion.js';
import {boilerPlate} from './boilerplate.js';
import {subKeyCompletion,subSubKeyCompletion,subSubSubKeyCompletion} from './keyCompletion.js';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(boilerPlate,simplecompletions,provideCoreCompletion,subKeyCompletion,subSubKeyCompletion,subSubKeyCompletion,subSubSubKeyCompletion);
}

export function deactivate() {}
