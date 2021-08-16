import { Meteor } from "meteor/meteor"
import { Accounts } from "meteor/accounts-base"
import { ChallengesCollection } from "/imports/db/challenges"
import "/imports/api/challengeMethods"
import "./service-config"

const insertChallenge = (title, user) =>
  ChallengesCollection.insert({
    title,
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
})
