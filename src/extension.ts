// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "old-hoglie-dynamic-cursor" is now active!');
	
	const command1 = vscode.commands.registerCommand('old-hoglie-dynamic-cursor.dropTail', () => {
		vscode.window.showInformationMessage('Attempting to drop tail of cursors!');
		const editor = vscode.window.activeTextEditor;
		if (editor && editor.selections.length > 1) {
			let selections = [...editor.selections];
			selections.sort((a, b) => a.active.isAfter(b.active) ? 1:-1 );
			selections.splice(0, 1);
			editor.selections = selections;
		} else {
			vscode.window.showInformationMessage('Failed to find multiple cursors');
		}
	});
	const command2 = vscode.commands.registerCommand('old-hoglie-dynamic-cursor.dropHead', () => {
		vscode.window.showInformationMessage('Attempting to drop head of cursors!');
		const editor = vscode.window.activeTextEditor;
		if (editor && editor.selections.length > 1) {
			let selections = [...editor.selections];
			selections.sort((a, b) => a.active.isAfter(b.active) ? 1:-1 );
			selections.pop();
			editor.selections = selections;
		} else {
			vscode.window.showInformationMessage('Failed to find multiple cursors');
		}
	});

	context.subscriptions.push(command1, command2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
