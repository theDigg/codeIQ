import React from 'react';
import DualPane from '../components/DualPane';
import CodeEditor from '../components/CodeEditor';
// import Tabs from '../components/MUI/IconTabs'

export default function CreateChallenge() {
  return (
    <div>
      <DualPane left={<div />} middle={<CodeEditor />} right={<div />} />
    </div>
  );
}
