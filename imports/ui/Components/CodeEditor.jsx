import React from 'react';
import Editor from '@monaco-editor/react';
import { EditorOptions } from './EditorOptions';

export default function CodeEditor() {
  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => console.log('onValidate:', marker.message));
  }

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// let's write some broken code 😈"
      onValidate={handleEditorValidation}
      options={EditorOptions}
      theme='vs-dark'
    />
  );
}
