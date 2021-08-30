import { Mongo } from 'meteor/mongo';

// export default new Mongo.Collection('rooms');

const Rooms = Object.assign(new Mongo.Collection('rooms'), {
  save({ title, userId }) {
    const newRoomId = this.insert({
      title,
      userId,
      createdAt: new Date(),
    });
    return this.findOne(newRoomId);
  },
});

export default Rooms