import { Meteor } from 'meteor/meteor';
import RoomsCollection from '../db/rooms';

Meteor.publish('rooms', function publishRooms(test) {
  return RoomsCollection.find({});
});
