import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import ChallengesCollection from '/imports/db/challenges';
import RoomsCollection from '/imports/db/rooms';
import seedChallenges from '/imports/db/seedChallenges';
import '/imports/api/challengeMethods';
import '/imports/api/roomMethods';
import '/imports/api/roomPublications';
import './service-config';

// const insertChallenge = (title, user) =>
//   ChallengesCollection.insert({
//     title,
//     userId: user._id,
//     createdAt: Date.now(),
//   });

const insertRoom = (title, user, url) => {
  RoomsCollection.insert({
    title,
    url,
    lobby: [user._id],
    userId: user._id,
    createdAt: Date.now(),
  });
};

const SEED_USERNAME = 'kyle';
const SEED_PASSWORD = 'pass';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (ChallengesCollection.find().count() !== 6) {
    seedChallenges();
  }

  if (RoomsCollection.find().count() === 0) {
    [
      {
        title: 'room1',
      },
      {
        title: 'room2',
      },
    ].forEach((room) => insertRoom(room.title, user));
  }
});
