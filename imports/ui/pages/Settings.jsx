import React, { useState } from 'react';
import Editor from '../Components/CodeEditor';
import EditorOptions from '../settings/editorSettings.json';
import { setSettings } from '../features/settings/settingsSlice';
import { useDispatch } from 'react-redux';
import LongMenu from '../Components/LongMenu';
import themes from '../themes/editor';

const settings = `
{
  "acceptSuggestionOnCommitCharacter": true,
  "acceptSuggestionOnEnter": "on",
  "autoClosingBrackets": "languageDefined",
  "autoClosingDelete": "always",
  "autoClosingOvertype": "always",
  "autoClosingQuotes": "languageDefined",
  "autoDetectHighContrast": true,
  "autoIndent": "advanced",
  "autoSurround": "languageDefined",
  "codeLens": false,
  "codeLensFontFamily": "MonoLisa",
  "codeLensFontSize": 14,
  "colorDecorators": true,
  "columnSelection": false,
  "contextmenu": true,
  "copyWithSyntaxHighlighting": true,
  "cursorBlinking": "blink",
  "cursorSmoothCaretAnimation": false,
  "cursorStyle": "line",
  "cursorSurroundingLines": 0,
  "cursorSurroundingLinesStyle": "default",
  "cursorWidth": 1,
  "definitionLinkOpensInPeek": false,
  "detectIndentation": true,
  "dragAndDrop": false,
  "fastScrollSensitivity": 5,
  "folding": true,
  "foldingHighlight": true,
  "fontFamily": "MonoLisa",
  "fontLigatures": true,
  "fontSize": 14,
  "fontWeight": "500",
  "formatOnPaste": false,
  "formatOnType": false,
  "glyphMargin": false,
  "lineNumbers": "on",
  "minimap": {
    "enabled": true,
    "maxColumn": 120,
    "renderCharacters": true,
    "scale": 1,
    "showSlider": "mouseover",
    "side": "right",
    "size": "actual"
  },
  "scrollbar": {
    "alwaysConsumeMouseWheel": true,
    "arrowSize": 11,
    "handleMouseWheel": true,
    "horizontal": "auto",
    "horizontalHasArrows": false,
    "horizontalScrollbarSize": 10,
    "horizontalSliderSize": 10,
    "scrollByPage": false,
    "useShadows": true,
    "vertical": "hidden",
    "verticalHasArrows": false,
    "verticalScrollbarSize": 10,
    "verticalSliderSize": 10
  },
  "smoothScrolling": false,
  "snippetSuggestions": true
}
`;

export default function SettingsPage() {
  const [editorSettings, setEditorSettings] = useState(settings);
  const dispatch = useDispatch();
  function handleEditorChange(value, event) {
    setEditorSettings(value);
  }
  return (
    <div>
      <h1> Settings </h1>
      <LongMenu items={Object.entries(themes)} />
      <button
        onClick={() => {
          dispatch(setSettings(JSON.parse(editorSettings)));
        }}
      >
        SAVE SETTINGS
      </button>
      <Editor handleEditorChange={handleEditorChange} solution={editorSettings} lang="json" />
    </div>
  );
}
