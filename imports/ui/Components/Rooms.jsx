import React from 'react';
import styled from 'styled-components';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Rooms from '../../db/rooms';
import { useDispatch } from 'react-redux';
import { setRooms, setCurrentRoom } from '../features/rooms/roomsSlice';

const createRoom = (roomId) => Meteor.call('rooms.insert', roomId);
const deleteRoom = (roomId) => Meteor.call('rooms.remove', roomId);
const joinRoom = (roomId, dispatch) => {
  if (Session.get('room')) {
    Meteor.call('rooms.leave', Session.get('room'));
  }
  Session.set('room', roomId);
  // dispatch(setCurrentRoom(roomId))
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
  const dispatch = useDispatch();
  const { rooms, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe('rooms');
    if (!handler.ready()) {
      return { isLoading: true };
    }
    const rooms = Rooms.find().fetch();
    dispatch(setRooms(rooms));
    return { rooms, isLoading: false };
  });
  const user = useTracker(() => Meteor.user());
  const [roomName, setRoomName] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!roomName) return;
    createRoom(roomName)

    setRoomName('');
  };

  return (
    <ScrollContainer>
      <h2>Meteor Rooms</h2>
      <input onChange={(e) => setRoomName(e.target.value)} />
      <button onClick={handleSubmit}>Create Room</button>
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
                <button onClick={() => (room.lobby.includes(user._id) ? leaveRoom(room._id) : joinRoom(room._id, dispatch))}>
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
