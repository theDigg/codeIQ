import { Meteor } from 'meteor/meteor';
import Rooms from '../db/rooms';

Meteor.publish('rooms', function publishRooms(test) {
  return Rooms.find({});
});
