// Create a collection where users can only modify documents that they own.
// Ownership is tracked by an `owner` field on each document. All documents must
// be owned by the user that created them and ownership can't be changed. Only a
// document's owner is allowed to delete it, and the `locked` attribute can be
// set on a document to prevent its accidental deletion.
const Posts = new Mongo.Collection('posts');

Posts.allow({
  insert(userId, doc) {
    // The user must be logged in and the document must be owned by the user.
    return userId && doc.owner === userId;
  },

  update(userId, doc, fields, modifier) {
    // Can only change your own documents.
    return doc.owner === userId;
  },

  remove(userId, doc) {
    // Can only remove your own documents.
    return doc.owner === userId;
  },

  fetch: ['owner'],
});

Posts.deny({
  update(userId, doc, fields, modifier) {
    // Can't change owners.
    return _.contains(fields, 'owner');
  },

  remove(userId, doc) {
    // Can't remove locked documents.
    return doc.locked;
  },

  fetch: ['locked'], // No need to fetch `owner`
});

// Cursors
// Print the titles of the five top-scoring posts.
const topPosts = Posts.find({}, { sort: { score: -1 }, limit: 5 });
let count = 0;

topPosts.forEach((post) => {
  console.log(`Title of post ${count}: ${post.title}`);
  count += 1;
});

// Keep track of how many administrators are online.
let count = 0;
const cursor = Users.find({ admin: true, onlineNow: true });

const handle = cursor.observeChanges({
  added(id, user) {
    count += 1;
    console.log(`${user.name} brings the total to ${count} admins.`);
  },

  removed() {
    count -= 1;
    console.log(`Lost one. We're now down to ${count} admins.`);
  }
});

// After five seconds, stop keeping the count.
setTimeout(() => handle.stop(), 5000);


// Matches all documents where `deleted` is false.
// { deleted: false }

// Matches all documents where the `name` and `cognomen` are as given.
// { name: 'Rhialto', cognomen: 'the Marvelous' }

// Matches every document.
// {}

// Matches documents where `age` is greater than 18.
// { age: { $gt: 18 } }

// Matches documents where `tags` is an array containing 'popular'.
// { tags: 'popular' }

// Matches documents where `fruit` is one of three possibilities.
// { fruit: { $in: ['peach', 'plum', 'pear'] } }

// Set the `admin` property on the document to true.
// { $set: { admin: true } }

// Add 2 to the `votes` property and add 'Traz' to the end of the `supporters`
// array.
// { $inc: { votes: 2 }, $push: { supporters: 'Traz' } }

// Find the document with ID '123' and completely replace it.
Users.update({ _id: '123' }, { name: 'Alice', friends: ['Bob'] });

// MONGO OPERATORS - (fields)
// Name            Description
// ---------------------------
// $currentDate    Sets the value of a field to current date, either as a Date or a Timestamp.
// $inc            Increments the value of the field by the specified amount.
// $min            Only updates the field if the specified value is less than the existing field value.
// $max            Only updates the field if the specified value is greater than the existing field value.
// $mul            Multiplies the value of the field by the specified amount.
// $rename         Renames a field.
// $set            Sets the value of a field in a document.
// $setOnInsert    Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents.
// $unset          Removes the specified field from a document.

// MONGO OPERATORS - (arrays)
// Name            Description
// ---------------------------
// $               Acts as a placeholder to update the first element that matches the query condition.
// $[]             Acts as a placeholder to update all elements in an array for the documents that match the query condition.
// $[<identifier>] Acts as a placeholder to update all elements that match the arrayFilters condition for the documents that match the query condition.
// $addToSet       Adds elements to an array only if they do not already exist in the set.
// $pop            Removes the first or last item of an array.
// $pull           Removes all array elements that match a specified query.
// $push           Adds an item to an array.
// $pullAll        Removes all matching values from an array.

// MONGO OPERATORS - (modifiers)
// Name            Description
// ---------------------------
// $each           Modifies the $push and $addToSet operators to append multiple items for array updates.
// $position       Modifies the $push operator to specify the position in the array to add elements.
// $slice          Modifies the $push operator to limit the size of updated arrays.
// $sort           Modifies the $push operator to reorder documents stored in an array.