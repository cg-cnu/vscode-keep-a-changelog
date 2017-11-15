'use strict';
import * as vscode from 'vscode';
import { workspace } from 'vscode';
import { join } from 'path';
import { existsSync, openSync, closeSync } from 'fs';

export function activate(context: vscode.ExtensionContext) {
    var workspaceObj: string = ''
    let changelog = vscode.commands.registerCommand('changelog.create', () => {
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
                    // console.log('workspace', workspace)
                })
        } else {
            const workspaceObj = workspaces[0]
        }
        // create CHANGELOG.md if not exists
        const changeLogFile = join(workspaceObj.uri.fsPath, 'CHANGELOG.md')
        if (!existsSync(changeLogFile)) {
            closeSync(openSync(changeLogFile, 'a'));
        }
        // ask for the release version
        // if exists increment the existing one ?

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
    });
    context.subscriptions.push(changelog);
}
