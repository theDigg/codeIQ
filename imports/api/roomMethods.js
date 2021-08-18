import { check } from "meteor/check"
import { RoomsCollection } from "../db/rooms"

Meteor.methods({
  "rooms.insert"(title) {
    check(title, String)

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.")
    }

    RoomsCollection.insert({
      title,
      createdAt: new Date(),
      lobby: [this.userId],
      userId: this.userId,
      challenge: ''
    })
  },

  "rooms.remove"(roomId) {
    check(roomId, String)

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.")
    }

    const room = RoomsCollection.findOne({
      _id: roomId,
      //   userId: this.userId,
    })

    if (!room) {
      throw new Meteor.Error("Access denied.")
    }

    RoomsCollection.remove(roomId)
  },

  "rooms.join"(roomId) {
    check(roomId, String)

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.")
    }

    let room = RoomsCollection.findOne({
      _id: roomId,
    })

    if (!room) {
      throw new Meteor.Error("Access denied.")
    }

    RoomsCollection.update(roomId, {
      $set: {
        lobby: [...room.lobby, this.userId],
      },
    })

    room = RoomsCollection.findOne({
      _id: roomId,
    })

    if (room.lobby.length > 1) {
      RoomsCollection.update(roomId, {
        $set: {
          challenge: 'Hello World',
        },
      })
    }
  },

  "rooms.leave"(roomId) {
    check(roomId, String)

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.")
    }

    const room = RoomsCollection.findOne({
      _id: roomId,
    })

    if (!room) {
      throw new Meteor.Error("Access denied.")
    }

    RoomsCollection.update(roomId, {
      $set: {
        lobby: room.lobby.filter((userId) => userId !== this.userId),
      },
    })
  },
})
