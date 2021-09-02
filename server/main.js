import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Server } from 'socket.io';
import { Accounts } from 'meteor/accounts-base';
import Challenges from '/imports/db/challenges';
import RoomsCollection from '/imports/db/rooms';
import seedChallenges from '/imports/db/seedChallenges';
import '/imports/api/challengeMethods';
import '/imports/api/roomMethods';
import '/imports/api/roomPublications';
import './service-config';
import '/imports/api/graphql';
import './monti'

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

const PORT = 8080;

const { httpServer } = WebApp;

Meteor.startup(() => {
  const io = new Server(httpServer);
  io.on('connection', function (socket) {
    console.log('new socket client', socket.id);
    socket.emit('test', 'Hello')
  });
  // if (Meteor.isServer) {
  //   Meteor.publish('challengeSub', function ({ solution }) {
  //     var self = this;
  //     self.added('challenge', 'madeUpId1', { m: solution }); //messages is the collection that will be published to
  //     self.ready();
  //   });
  // }

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (Challenges.find().count() !== 6) {
    seedChallenges();
  }
});
