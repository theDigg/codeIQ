import React from 'react';
import Editor from '@monaco-editor/react';
import { EditorOptions } from './EditorOptions';
import { useSelector } from 'react-redux';

export default function CodeEditor({ solution, handleEditorChange }) {
  return (
    <Editor
      height="95vh"
      defaultLanguage="javascript"
      defaultValue={''}
      value={solution}
      onChange={handleEditorChange}
      options={EditorOptions}
      theme="vs-dark"
    />
  );
}
