// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	
	const command1 = vscode.commands.registerCommand('old-hoglie-dynamic-cursor.dropTail', () => {
		dropCursor('tail');
	});
	const command2 = vscode.commands.registerCommand('old-hoglie-dynamic-cursor.dropHead', () => {
		dropCursor('head');
	});

	context.subscriptions.push(command1, command2);
}


function dropCursor(dropPosition: string) {
	const editor = vscode.window.activeTextEditor;
	if (editor && editor.selections.length > 1) {

		// make a shallow copy of the current selections
		let selections = [...editor.selections];

		// Sorts selections such that they are ordered top to bottom
		selections.sort((a, b) => a.active.isAfter(b.active) ? 1:-1 );

		// Drop the specified cursor
		switch (dropPosition) {
			case 'tail':
				selections.splice(0, 1);
				break;
			case 'head':
				selections.pop();
				break;
		}

		// Assign the editor selections to the new selections 
		editor.selections = selections;
		// this is probably redundant, I think I can probably do the following mapping in situ in the line above, but this definitely works
		// Maps current selections onto the words at that position such that the user doesn't need to continually reselect
		editor.selections = [...editor.selections].map(
			selection => 
			{
				const newRange = editor.document.getWordRangeAtPosition(selection.active);
				if (newRange){
					return new vscode.Selection(newRange.start, newRange.end);
				} else {
					return selection;
				}
			}
		);
	}

}
// This method is called when your extension is deactivated
export function deactivate() {}
