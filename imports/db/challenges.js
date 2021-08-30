import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Challenges = new Mongo.Collection('challenges');

const Schema = {};

Schema.AuthorSolution = new SimpleSchema({
  sources: { type: Array, optional: true },
  'sources.$': { type: Object },
  'sources.$.source': { type: String },
  'sources.$.language': { type: String },
});

Schema.IO = new SimpleSchema({
  input: { type: Array },
  'input.$': { type: Object },
  'input.$.name': { type: String },
  'input.$.description': { type: String },
  'input.$.type': { type: String },
  output: { type: Object },
  'output.description': { type: String },
  'output.type': { type: String },
  tests: { type: Array },
  'tests.$': { type: Object },
  'tests.$.id': { type: Number },
  'tests.$.input': { type: Array },
  'tests.$.input.$': { type: Number },
  'tests.$.output': { type: Number },
  timeLimits: { type: Object },
  'timeLimits.$': { type: Number },
  hasAuthorSolution: { type: Boolean },
  stats: { type: Object },
  'stats.solveTimeStats': { type: Object },
  'stats.solveTimeStats.totalSolveTime': { type: Number },
  'stats.solveTimeStats.userCount': { type: Number },
  'stats.submissionStats': { type: Object },
  'stats.submissionStats.successful': { type: Number },
  'stats.submissionStats.unsuccessful': { type: Number },
  scheduledStatsUpdate: { type: Number },
});

Challenges.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  type: { type: String },
  generalType: { type: String },
  sourceName: { type: String },
  name: { type: String },
  description: { type: String },
  difficulty: { type: String },
  authorId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  authorSolution: { type: Schema.AuthorSolution },
  source: { type: String },
  language: { type: String },
  createdBy: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  date: { type: Date },
  status: { type: String },
  //   tags: { type: Array, optional: true },
  io: { type: Schema.IO },
  title: { type: String },
  createdAt: { type: Date },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
});

export default Challenges;
