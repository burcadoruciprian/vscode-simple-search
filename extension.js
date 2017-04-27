
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
  var query = GetSearchQuery();
  if (!query)
    return;
  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(query));
}

// Creates the search URL based on the selection and the query template.
function GetSearchQuery() {
  var selectedText = vscode.window.activeTextEditor.document.getText();
  if (!selectedText)
    return '';
  
  var simpleSearchCfg = vscode.workspace.getConfiguration(CFG_SECTION);
  const queryTemplate = simpleSearchCfg.get(CFG_QUERY);
  var query = queryTemplate.replace("%SELECTION%", selectedText);
  return query;
}