
// Constant strings 
const CFG_SECTION = "simpleSearch";
const CFG_QUERY = "QueryTemplate";
const CMD_ID = "extension.simpleSearch";

var vscode = require('vscode');

function activate(context) {

  var disposable = vscode.commands.registerTextEditorCommand(CMD_ID, WebSearch);

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;

// Launches the search URL in default browser
function WebSearch() {
  var selectedText = GetSelectedText();
  if (!selectedText)
    return;

  var uriText = encodeURI(selectedText);

  var simpleSearchCfg = vscode.workspace.getConfiguration(CFG_SECTION);
  const queryTemplate = simpleSearchCfg.get(CFG_QUERY);
  var query = queryTemplate.replace("%SELECTION%", uriText);

  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

// Creates the search URL based on the selection and the query template.
function GetSelectedText() {
  const documentText = vscode.window.activeTextEditor.document.getText();
  if (!documentText)
    return '';

  var activeSelection = vscode.window.activeTextEditor.selection;
  if (activeSelection.isEmpty)
    return '';

  const selStartOffset = vscode.window.activeTextEditor.document.offsetAt(activeSelection.start);
  const selEndOffset = vscode.window.activeTextEditor.document.offsetAt(activeSelection.end);

  var selectedText = documentText.slice(selStartOffset, selEndOffset).trim();
  selectedText = selectedText.replace(/\s\s+/g, ' ');
  return selectedText;
}