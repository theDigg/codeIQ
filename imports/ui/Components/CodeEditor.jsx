import React, { useEffect, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { useSelector } from 'react-redux';

export default function CodeEditor({ solution, handleEditorChange, lang }) {
  const monacoRef = useRef(null);
  const monaco = useMonaco();
  const { editorSettings, editorTheme } = useSelector((state) => state.settings);

  function handleEditorWillMount(monaco) {
    // here is the monaco instance
    // do something before editor is mounted
    // monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    // Object.entries(themes).forEach(entry => {
    //   console.log(entry)
    // })
    // monaco.editor.defineTheme(editorTheme.name.split(' ').join(''), editorTheme.value);
    // monaco.editor.setTheme(editorTheme.name.split(' ').join(''));
  }

  function handleEditorDidMount(editor, monaco) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = editor;
    monaco.editor.setTheme(editorTheme.name.split(' ').join(''));
  }

  useEffect(() => {
    if (monaco) {
      // console.log('here is the monaco instance:', monaco);
      monaco.editor.defineTheme(editorTheme.name.split(' ').join(''), editorTheme.value);
      monaco.editor.setTheme(editorTheme.name.split(' ').join(''));
    }
  }, [monaco, editorTheme.name]);

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
    />
  );
}
