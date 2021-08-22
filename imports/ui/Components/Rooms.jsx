import React from 'react';
import styled from 'styled-components';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import RoomsCollection from '../../db/rooms';

const createRoom = (roomId) => Meteor.call('rooms.insert', roomId);
const deleteRoom = (roomId) => Meteor.call('rooms.remove', roomId);
const joinRoom = (roomId) => {
  if (Session.get('room')) {
    Meteor.call('rooms.leave', Session.get('room'));
  }
  Session.set('room', roomId);
  Meteor.call('rooms.join', roomId);
};

const leaveRoom = (roomId) => {
  Session.set('room', '');
  Meteor.call('rooms.leave', roomId);
};

const ScrollContainer = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default () => {
  const { rooms, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe('rooms');
    if (!handler.ready()) {
      return { isLoading: true };
    }
    const rooms = RoomsCollection.find().fetch();
    return { rooms, isLoading: false };
  });
  const user = useTracker(() => Meteor.user());
  const [roomName, setRoomName] = React.useState('');

  return (
    <ScrollContainer>
      <h2>Meteor Rooms</h2>
      <input onChange={(e) => setRoomName(e.target.value)} />
      <button onClick={() => createRoom(roomName)}>Create Room</button>
      <ul>
        {!isLoading &&
          user &&
          rooms.map((room) => (
            <li key={room._id}>
              <div>
                <span>{room.title}</span>
                <ul>
                  {room.lobby.map((user) => (
                    <li key={user}>{user}</li>
                  ))}
                </ul>
                <button onClick={() => (room.lobby.includes(user._id) ? leaveRoom(room._id) : joinRoom(room._id))}>
                  {room.lobby.includes(user._id) ? 'Leave room' : 'Join Room'}
                </button>
                <button onClick={() => deleteRoom(room._id)} disabled={user._id !== room.userId}>
                  Delete Room
                </button>
              </div>
            </li>
          ))}
      </ul>
    </ScrollContainer>
  );
};