import React from 'react';
import Editor from '@monaco-editor/react';
// import { EditorOptions } from './EditorOptions';
import { useSelector } from 'react-redux';

export default function CodeEditor({ solution, handleEditorChange, lang }) {
  const { editorSettings } = useSelector(state => state.settings)

  return (
    <Editor
      height="95vh"
      defaultLanguage={lang}
      defaultValue={''}
      value={solution}
      onChange={handleEditorChange}
      options={editorSettings}
      theme="vs-dark"
    />
  );
}
