import React from "react"
import { useTracker } from "meteor/react-meteor-data"
import { RoomsCollection } from "../db/rooms"

const createRoom = (roomId) => Meteor.call("rooms.insert", roomId)
const joinRoom = (roomId) => Meteor.call("rooms.join", roomId)
const leaveRoom = (roomId) => Meteor.call("rooms.leave", roomId)

export const Rooms = () => {
  const rooms = useTracker(() => RoomsCollection.find().fetch())
  const user = useTracker(() => Meteor.user())
  const [roomName, setRoomName] = React.useState('')

  return (
    <div>
      <h2>Meteor Rooms</h2>
      <input onChange={e => setRoomName(e.target.value)}/>
      <button onClick={() => createRoom(roomName)}>Create Room</button>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            <div>
              <span>{room.title}</span>
              <ul>
                {room.lobby.map((user) => (
                  <li>{user}</li>
                ))}
              </ul>
              <button
                onClick={() =>
                  room.lobby.includes(user._id)
                    ? leaveRoom(room._id)
                    : joinRoom(room._id)
                }
              >
                {room.lobby.includes(user._id) ? "Leave room" : "Join Room"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
