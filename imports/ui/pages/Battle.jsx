import React from 'react';
import CodeEditor from '../components/CodeEditor';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import Windows from '../components/PaneWindows';
import Rooms from '../components/Rooms';
import RoomsCollection from '/imports/db/rooms';
import { useDispatch } from 'react-redux';
import { setCurrentRoom } from '../features/rooms/roomsSlice';


export default function BattlePage({ user }) {
  const dispatch = useDispatch()
  const room = useTracker(() => {
    return RoomsCollection.findOne(
      { _id: Session.get('room') },
    );
  });
  dispatch(setCurrentRoom(room))

  function handleEditorChange(value, event) {
    Meteor.call('rooms.editSolution', room._id, value);
  }

  const opponents = room?.lobby.filter(id => id !== user._id)
  const solution1 = room?.solutions?.[opponents[0]]
  const solution2 = room?.solutions?.[opponents[1]];

  const myEditor = <CodeEditor handleEditorChange={handleEditorChange} solution={room?.solutions?.[user._id]} lang='javascript'/>

  const panes = (
    <Windows
      topLeft={<Rooms />}
      topRight={myEditor}
      bottomLeft={<CodeEditor solution={solution1} lang="javascript" />}
      bottomRight={<CodeEditor solution={solution2} lang="javascript" />}
    />
  );

  return (
    <div>
      {/* <h1> Battle Page </h1> */}
      {panes}
    </div>
  );
}
