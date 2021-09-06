import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Server } from 'socket.io';
import { Accounts } from 'meteor/accounts-base';
import Challenges from '/imports/db/Challenges';
import RoomsCollection from '/imports/db/rooms';
import seedChallenges from '/imports/db/seedChallenges';
import '/imports/api/challengeMethods';
import '/imports/api/roomMethods';
import '/imports/api/roomPublications';
import './service-config';
import '/imports/api/graphql';
import './monti';
import './testPiston';

const insertRoom = (title, user, url) => {
  RoomsCollection.insert({
    title,
    url,
    lobby: [user._id],
    userId: user._id,
    createdAt: Date.now(),
  });
};

const { httpServer } = WebApp;

var users = [
  { name: 'Normal User', email: 'normal@example.com', roles: [] },
  { name: 'View-Secrets User', email: 'view@example.com', roles: ['view-secrets'] },
  { name: 'Manage-Users User', email: 'manage@example.com', roles: ['manage-users'] },
  { name: 'Admin User', email: 'admin@example.com', roles: ['admin'] },
];

Meteor.startup(() => {
  const io = new Server(httpServer);
  io.on('connection', function (socket) {
    console.log('new socket client', socket.id);
    socket.emit('test', 'Hello');
  });
  if (Meteor.isServer) {
    Meteor.publish(null, function () {
      if (this.userId) {
        return Meteor.roleAssignment.find({ 'user._id': this.userId });
      } else {
        this.ready();
      }
    });
  }

  if (Meteor.users.find().count() === 0) {
    users.forEach(function (user) {
      var id;

      id = Accounts.createUser({
        email: user.email,
        password: 'apple1',
        profile: { name: user.name },
      });

      if (Meteor.roleAssignment.find({ 'user._id': id }).count() === 0) {
        import { Roles } from 'meteor/alanning:roles';

        user.roles.forEach(function (role) {
          Roles.createRole(role, { unlessExists: true });
        });
        // Need _id of existing user record so this call must come after `Accounts.createUser`.
        Roles.addUsersToRoles(id, user.roles);
      }
    });
  }

  if (Challenges.find().count() !== 1) {
    seedChallenges();
  }
});
