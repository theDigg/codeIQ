import React from 'react';
import Editor from '@monaco-editor/react';
import CodeEditor from '../Components/CodeEditor';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import Windows from '../Components/PaneWindows';
import Rooms from '../Components/Rooms';
import RoomsCollection from '/imports/db/rooms';

export default function BattlePage({ user }) {
  const room = useTracker(() => {
    return RoomsCollection.findOne(
      { _id: Session.get('room') },
      {
        sort: { createdAt: -1 },
      },
    );
  });
  function handleEditorChange(value, event) {
    Meteor.call('challenges.edit', room.challenge._id, value);
  }
  const editor = <CodeEditor />;
  const panes = <Windows topLeft={<Rooms />} topRight={editor} bottomLeft={editor} bottomRight={editor} />;

  return (
    <div>
      {/* <h1> Battle Page </h1> */}
      {panes}
    </div>
  );
}
