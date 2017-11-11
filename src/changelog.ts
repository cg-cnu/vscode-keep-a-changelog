'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let changelog = vscode.commands.registerCommand('changelog.create', () => {
        // get the root of the current active file/workspace
        // if the file not exists 
        // create CHANGELOG.md
        // ask for the release version 
        // if exists increment the existing one
        // ask for the type of changes...
        // ask for the 
        vscode.window.showInformationMessage('Hello World!');

    });
    context.subscriptions.push(changelog);
}
