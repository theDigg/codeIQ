import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Leaderboards = new Mongo.Collection('leaderboards');

const Schema = {};

Schema.Submission = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  authorId: { type: String, regEx: SimpleSchema.RegEx.Id },
  language: { type: String },
  verdict: { type: String },
  source: { type: String },
  score: { type: SimpleSchema.Integer },
  date: { type: Date },
  chars: { type: SimpleSchema.Integer },
  voteScore: { type: SimpleSchema.Integer },
  votes: { type: Object },
  challengeId: { type: String, regEx: SimpleSchema.RegEx.Id },
  timePenalty: { type: SimpleSchema.Integer },
  current: { type: Boolean },
  authorUsername: { type: String },
  time: { type: SimpleSchema.Integer }
});

Schema.User = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  avatar: { type: String },
  username: { type: String },
  language: { type: String },
  country: { type: String },
});

Leaderboards.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  submissions: { type: Array },
  'submissions.$': { type: Schema.Submission },
  submissionsCount: { type: SimpleSchema.Integer },
  users: { type: Array },
  'users.$': { type: Schema.User }
});

export default Leaderboards;
