import React, { useEffect, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import highlineTheme from '../themes/editor/highline.json';
import * as themes from '../themes/editor'
import { useSelector } from 'react-redux';

export default function CodeEditor({ solution, handleEditorChange, lang }) {
  const monacoRef = useRef(null);
  const monaco = useMonaco();
  const { editorSettings } = useSelector((state) => state.settings);
  console.log(themes);

  function handleEditorWillMount(monaco) {
    // here is the monaco instance
    // do something before editor is mounted
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    monaco.editor.defineTheme('highline', highlineTheme);
    monaco.editor.setTheme('highline');
  }

  function handleEditorDidMount(editor, monaco) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = editor;
  }

  useEffect(() => {
    if (monaco) {
      console.log('here is the monaco isntance:', monaco);
    }
  }, [monaco]);

  return (
    <Editor
      height="95vh"
      defaultLanguage={lang}
      defaultValue={''}
      value={solution}
      onChange={handleEditorChange}
      options={editorSettings}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
      theme="highline"
    />
  );
}
