import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
// import { WebApp } from 'meteor/webapp';
import http from 'http';
import socket_io from 'socket.io';
import Challenges from '/imports/db/challenges';
import RoomsCollection from '/imports/db/rooms';
import seedChallenges from '/imports/db/seedChallenges';
import '/imports/api/challengeMethods';
import '/imports/api/roomMethods';
import '/imports/api/roomPublications';
import './service-config';
import '/imports/api/graphql';

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

Meteor.startup(() => {
  const server = http.createServer();
  const io = socket_io(server, {
    cors: ['http://localhost:3000'],
  });

  let counter = 0;

  // New client
  io.on('connection', function (socket) {
    console.log('new socket client');
  });

  // Start server
  try {
    server.listen(PORT);
  } catch (e) {
    console.error(e);
  }

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
