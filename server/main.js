import { Meteor } from "meteor/meteor"
import { Accounts } from "meteor/accounts-base"
import { ChallengesCollection } from "/imports/db/challenges"
import { RoomsCollection } from "/imports/db/rooms"
import "/imports/api/challengeMethods"
import "/imports/api/roomMethods"
import "./service-config"

const insertChallenge = (title, user) =>
  ChallengesCollection.insert({
    title,
    userId: user._id,
    createdAt: Date.now(),
  })

const insertRoom = (title, user, url) =>
  RoomsCollection.insert({
    title,
    url,
    lobby: [user._id],
    userId: user._id,
    createdAt: Date.now(),
  })

const SEED_USERNAME = "kyle"
const SEED_PASSWORD = "pass"

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    })
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME)

  if (ChallengesCollection.find().count() === 0) {
    ;[
      "First Challenge",
      "Second Challenge",
      "Third Challenge",
      "Fourth Challenge",
      "Fifth Challenge",
      "Sixth Challenge",
      "Seventh Challenge",
    ].forEach((title) => insertChallenge(title, user))
  }

  if (RoomsCollection.find().count() === 0) {
    ;[
      {
        title: "room1",
      },
      {
        title: "room2",
      },
    ].forEach((room) => insertRoom(room.title, user))
  }
})
