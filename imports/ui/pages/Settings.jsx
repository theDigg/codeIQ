import React, { useState } from 'react';
import Editor from '../Components/CodeEditor';
import { EditorOptions } from '../Components/EditorOptions';
import { setSettings } from '../features/settings/settingsSlice';
import { useDispatch } from 'react-redux';

const Settings = `
const EditorSettings = {
  acceptSuggestionOnCommitCharacter: true, // Accept suggestions on provider defined characters. Defaults to true.
  acceptSuggestionOnEnter: 'on', // "on" | "off" | "smart" - Accept suggestions on ENTER. Defaults to 'on'.
  autoClosingBrackets: 'languageDefined', // "always" | "languageDefined" | "beforeWhitespace" | "never"
  autoClosingDelete: 'always', // "always" | "auto" | "never"
  autoClosingOvertype: 'always', // "always" | "auto" | "never"
  autoClosingQuotes: 'languageDefined', // "always" | "languageDefined" | "beforeWhitespace" | "never"
  autoDetectHighContrast: true, // If enabled, will automatically change to high contrast theme if the OS is using a high contrast theme. Defaults to true.
  autoIndent: 'advanced', // "none" | "advanced" | "full" | "brackets" | "keep" - Controls whether the editor should automatically adjust the indentation when users type, paste, move or indent lines. Defaults to advanced.
  autoSurround: 'languageDefined', // "languageDefined" | "quotes" | "brackets" | "never"
  codeLens: false, // Show code lens Defaults to true.
  codeLensFontFamily: 'MonoLisa', // Code lens font family. Defaults to editor font family.
  codeLensFontSize: 14, // Code lens font size. Default to 90% of the editor font size
  colorDecorators: true, // Enable inline color decorators and color picker rendering.
  columnSelection: false, // Enable that the selection with the mouse and keys is doing column selection. Defaults to false.
  contextmenu: true, // Enable custom contextmenu. Defaults to true.
  copyWithSyntaxHighlighting: true, // Syntax highlighting is copied.
  cursorBlinking: 'blink', // Control the cursor animation style, possible values are 'blink', 'smooth', 'phase', 'expand' and 'solid'. Defaults to 'blink'.
  cursorSmoothCaretAnimation: false, // Enable smooth caret animation. Defaults to false.
  cursorStyle: 'line', // "line" | "block" | "underline" | "line-thin" | "block-outline" | "underline-thin" - Control the cursor style, either 'block' or 'line'. Defaults to 'line'.
  cursorSurroundingLines: 0, // Controls the minimal number of visible leading and trailing lines surrounding the cursor. Defaults to 0.
  cursorSurroundingLinesStyle: 'default', // "default" | "all" - Controls when cursorSurroundingLines should be enforced Defaults to default, cursorSurroundingLines is not enforced when cursor position is changed by mouse.
  cursorWidth: 1, // Control the width of the cursor when cursorStyle is set to 'line'
  definitionLinkOpensInPeek: false, // Controls whether the definition link opens element in the peek widget. Defaults to false.
  detectIndentation: true, // Controls whether tabSize and insertSpaces will be automatically detected when a file is opened based on the file contents. Defaults to true.
  dragAndDrop: false, // Controls if the editor should allow to move selections via drag and drop. Defaults to false.
  fastScrollSensitivity: true, // Copying without a selection copies the current line.
  fastScrollSensitivity: 5, // FastScrolling mulitplier speed when pressing Alt Defaults to 5.
  folding: true, // Enable code folding. Defaults to true.
  foldingHighlight: true, // Enable highlight for folded regions. Defaults to true.
  fontFamily: 'MonoLisa', // The font family
  fontLigatures: true, // Enable font ligatures. Defaults to false.
  fontSize: 14, // The font size
  fontWeight: '500', // The font weight
  formatOnPaste: false, // Enable format on paste. Defaults to false.
  formatOnType: false, // Enable format on type. Defaults to false.
  glyphMargin: false, // Enable the rendering of the glyph margin. Defaults to true in vscode and to false in monaco-editor.
  // letterSpacing: 1, // The letter spacing
  // lineHeight: 10, // The line height
  lineNumbers: 'on', // "on" | "off" | "relative" | "interval" | ((lineNumber: number) => string) - Control the rendering of line numbers. If it is a function, it will be invoked when rendering a line number and the return value will be rendered. Otherwise, if it is a truey, line numbers will be rendered normally (equivalent of using an identity function). Otherwise, line numbers will not be rendered. Defaults to on.
  minimap: {
    enabled: false, // Enable the rendering of the minimap. Defaults to true.
    maxColumn: 80, // Limit the width of the minimap to render at most a certain number of columns. Defaults to 120.
    renderCharacters: true, // Render the actual text on a line (as opposed to color blocks). Defaults to true.
    scale: 1, // Relative size of the font in the minimap. Defaults to 1.
    showSlider: 'mouseover', // "always" | "mouseover"
    side: 'right', // Control the side of the minimap in editor. Defaults to 'right'.
    size: 'actual', // Control the minimap rendering mode. Defaults to 'actual'.
  },
  scrollbar: {
    alwaysConsumeMouseWheel: true, // Always consume mouse wheel events (always call preventDefault() and stopPropagation() on the browser events). Defaults to true. NOTE: This option cannot be updated using updateOptions()
    arrowSize: 11, // The size of arrows (if displayed). Defaults to 11. NOTE: This option cannot be updated using updateOptions()
    handleMouseWheel: true, // Listen to mouse wheel events and react to them by scrolling. Defaults to true.
    horizontal: 'auto', // "auto" | "visible" | "hidden" - Render horizontal scrollbar. Defaults to 'auto'.
    horizontalHasArrows: false, // Render arrows at the left and right of the horizontal scrollbar. Defaults to false. NOTE: This option cannot be updated using updateOptions()
    horizontalScrollbarSize: 10, // Height in pixels for the horizontal scrollbar. Defaults to 10 (px).
    horizontalSliderSize: 10, // Height in pixels for the horizontal slider. Defaults to horizontalScrollbarSize. NOTE: This option cannot be updated using updateOptions()
    scrollByPage: false, // Scroll gutter clicks move by page vs jump to position. Defaults to false.
    useShadows: true, // Cast horizontal and vertical shadows when the content is scrolled. Defaults to true. NOTE: This option cannot be updated using updateOptions()
    vertical: 'hidden', // Render vertical scrollbar. Defaults to 'auto'.
    verticalHasArrows: false, // Render arrows at the top and bottom of the vertical scrollbar. Defaults to false. NOTE: This option cannot be updated using updateOptions()
    verticalScrollbarSize: 10, // Width in pixels for the vertical scrollbar. Defaults to 10 (px).
    verticalSliderSize: 10, // Width in pixels for the vertical slider. Defaults to verticalScrollbarSize. NOTE: This option cannot be updated using updateOptions()
  },
  smoothScrolling: false, // Enable that the editor animates scrolling to a position. Defaults to false.
  snippetSuggestions: true, // Enable snippet suggestions. Default to 'true'.
  theme: 'vs-dark', // Initial theme to be used for rendering. The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black'. You can create custom themes via monaco.editor.defineTheme. To switch a theme, use monaco.editor.setTheme. NOTE: The theme might be overwritten if the OS is in high contrast mode, unless autoDetectHighContrast is set to false.
};
`;

export default function SettingsPage() {
  const [editorSettings, setEditorSettings] = useState('');
  const dispatch = useDispatch();
  function handleEditorChange(value, event) {
    console.log(editorSettings, typeof editorSettings);
    setEditorSettings(value);
  }
  return (
    <div>
      <h1> Settings </h1>
      <button
        onClick={() => {
          dispatch(setSettings(editorSettings.slice(24)));
        }}
      >
        SAVE SETTINGS
      </button>
      <Editor handleEditorChange={handleEditorChange} solution={Settings} />
      {/* <input type="text" onChange={}/> */}
    </div>
  );
}
