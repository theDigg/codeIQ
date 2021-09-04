import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import RoomsCollection from '../db/rooms';
import ChallengesCollection from '../db/Challenges';

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

Meteor.methods({
  'rooms.insert'(title) {
    check(title, String);

    if (!this.userId) throw new Meteor.Error('Not authorized.');

    RoomsCollection.insert({
      title,
      started: false,
      createdAt: Date.now(),
      lobby: [this.userId],
      userId: this.userId,
      challenge: {},
    });
  },

  'rooms.remove'(roomId) {
    check(roomId, String);

    if (!this.userId) throw new Meteor.Error('Not authorized.');

    const room = RoomsCollection.findOne({
      _id: roomId,
      // userId: this.userId,
    });

    if (!room) throw new Meteor.Error('Access denied.');

    RoomsCollection.remove(roomId);
  },

  'rooms.join'(roomId) {
    check(roomId, String);

    if (!this.userId) throw new Meteor.Error('Not authorized.');

    let room = RoomsCollection.findOne({
      _id: roomId,
    });

    if (!room) throw new Meteor.Error('Access denied.');

    RoomsCollection.update(roomId, {
      $push: {
        lobby: this.userId,
      },
    });

    room = RoomsCollection.findOne({
      _id: roomId,
    });

    if (room.lobby.length === 3) {
      const challengeCount = ChallengesCollection.find({}).count();
      const randomNum = random(0, challengeCount - 1);
      const challenge = ChallengesCollection.find({}).fetch()[randomNum];
      RoomsCollection.update(roomId, {
        $set: {
          started: true,
          challenge,
          solutions: room.lobby.reduce((acc, userId) => {
            acc[userId] = challenge.solution
            return acc
          }, {}),
        },
      });
    }
  },

  'rooms.editSolution'(roomId, solution) {
    check(roomId, String);

    if (!this.userId) throw new Meteor.Error('Not authorized.');

    let room = RoomsCollection.findOne({
      _id: roomId,
    });

    if (!room) throw new Meteor.Error('Access denied.');
    if (!room.lobby.includes(this.userId)) throw new Meteor.Error('Access denied.');
    if (!room.started) throw new Meteor.Error("Game hasn't started yet");

    // room.solutions[this.userId] = solution
    RoomsCollection.update(roomId, {
      $set: {
        [`solutions.${this.userId}`]: solution,
      },
    });
  },

  'rooms.leave'(roomId) {
    check(roomId, String);

    if (!this.userId) throw new Meteor.Error('Not authorized.');

    const room = RoomsCollection.findOne({ _id: roomId });

    if (!room) throw new Meteor.Error('Access denied.');

    RoomsCollection.update(roomId, {
      $pull: {
        lobby: this.userId,
      },
      $set: {
        challenge: {},
      },
    });
  },
});

/*
1. We wait for 3 users to enter a room
2. Once the third person enters, 
   stream a random challenge to all three participants
3. Each participant will write to a field on the room object what their solution is.
4. On client, display all three solutions (You and your opponents)
5. First user to complete the challenge by passing all the tests will be the winner.
*/
