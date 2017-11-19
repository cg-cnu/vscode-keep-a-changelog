'use strict';
import * as vscode from 'vscode';
import { workspace } from 'vscode';
import { join } from 'path';
import { existsSync, openSync, closeSync } from 'fs';


export function activate(context: vscode.ExtensionContext) {

    // add new version to changelog
    let addVersion = vscode.commands.registerCommand('changelog.addVersion', () => {
        // show the last version
        // Ask them to increment the version
    })
    context.subscriptions.push(addVersion);
    
    // add changes to the changelog
    let addChange = vscode.commands.registerCommand('changelog.addChange', () => {

        const changeTypes = [
            'Changed: for changes in existing functionality',
            'Deprecated: for soon-to-be removed features.',
            'Removed: for now removed features',
            'Fixed: for any bugs',
            'Security: in case of vulnerabilities.']

        // ask for the type of changes...
        vscode.window.showQuickPick(changeTypes)
            .then(changeType => {
                if (!changeType) {
                    return;
                }
                vscode.window.showInputBox({
                    ignoreFocusOut: true,
                    placeHolder: 'Description here...',
                    prompt: 'Enter the descriptions of the change'
                }).then(description => {
                    if (!description) {
                        return;
                    }
                    console.log('changeType', changeType)
                    console.log('description', description)
                    // TODO: created by admin @ 2017-11-13 23:26:21
                    // write to the file
                })
            })
        })
        context.subscriptions.push(addChange);

    // Create changelog if don't exist
    let create = vscode.commands.registerCommand('changelog.create', () => {
        var workspaceObj;
        const workspaces = vscode.workspace.workspaceFolders;
        if (workspaces.length !== 1) {
            const workspaceNames = workspaces.map(workspace => workspace.name);
            vscode.window.showQuickPick(workspaceNames)
                .then(workspaceName => {
                    // get the workspace object 
                    const workspaceObj = workspaces.find(
                        workspace => {
                            return workspace.name === workspaceName;
                        }
                    )
                })
        } else {
            const workspaceObj = workspaces[0]
        }
        // create CHANGELOG.md if not exists
        const changeLogFile = join(workspaceObj.uri.fsPath, 'CHANGELOG.md')
        if (!existsSync(changeLogFile)) {
            closeSync(openSync(changeLogFile, 'a'));
        }
        // TODO: created by admin @ 2017-11-19 23:10:37
        // Write the contents to the file
    });
    context.subscriptions.push(create);
}
