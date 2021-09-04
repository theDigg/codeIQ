import { Meteor } from 'meteor/meteor';
import { startGraphQLServer } from 'meteor/quave:graphql/server';
import Challenges from '../db/Challenges';
import Rooms from '../db/rooms';

const log = (error) => console.error('GraphQL server error', error);

const UserSchema = `
  type Query {
    loggedUser: User
  }

  type User {
    _id: ID!
    username: String
  }
`;

const UserResolvers = {
  Query: {
    async loggedUser(root, args, { userId }) {
      if (!userId) {
        return null;
      }
      return Meteor.users.findOne(userId);
    },
  },
};

const RoomSchema = `
  type Query {
    rooms: [Room]
  }

  type Room {
    _id: ID!
    title: String
    started: Boolean
    createdAt: Int
    lobby: [String]
    userId: String
  }

  type Mutation {
    addRoom(title: String!): Room
  }
`;

const RoomResolvers = {
  Query: {
    async rooms(root, args, { userId }) {
      if (!userId) {
        return null;
      }
      return Rooms.find({});
    },
  },
  Mutation: {
    addRoom(root, { title }, { userId }) {
      if (!userId) {
        return null;
      }
      return Rooms.save({ title, userId });
    },
  },
};

const ChallengeSchema = `
  type Query {
    challenges: [Challenge]
  }

  type Challenge {
    _id: ID!
    title: String
    createdAt: String
    user: User
  }
`;

const ChallengeResolvers = {
  Query: {
    async challenges(root, args, { userId }) {
      if (!userId) {
        return null;
      }
      return Challenges.find({});
    },
  },
  Challenge: {
    user({ userId }) {
      return Meteor.users.findOne(userId);
    },
  },
};

startGraphQLServer({
  typeDefs: [UserSchema, RoomSchema, ChallengeSchema],
  resolvers: [UserResolvers, RoomResolvers, ChallengeResolvers],
  log,
});
