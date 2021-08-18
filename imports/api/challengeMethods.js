import { check } from "meteor/check"
import { ChallengesCollection } from "../db/challenges"

Meteor.methods({
  "challenges.insert"(title) {
    check(title, String)

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.")
    }

    ChallengesCollection.insert({
      title,
      createdAt: new Date(),
      userId: this.userId,
    })
  },

  "challenges.edit"(challengeId, value) {
    check(challengeId, String)
    check(value, String)

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.")
    }

    const challenge = ChallengesCollection.findOne({
      _id: challengeId,
    })

    if (!challenge) {
      throw new Meteor.Error("Access denied.")
    }

    ChallengesCollection.update(challengeId, {
      $set: {
        solution: value,
      },
    })
  },

  "challenges.remove"(challengeId) {
    check(challengeId, String)

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.")
    }

    const challenge = ChallengesCollection.findOne({
      _id: challengeId,
      userId: this.userId,
    })

    if (!challenge) {
      throw new Meteor.Error("Access denied.")
    }

    ChallengesCollection.remove(challengeId)
  },

  "challenges.setCompleted"(challengeId, isCompleted) {
    check(challengeId, String)
    check(isCompleted, Boolean)

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.")
    }

    const challenge = ChallengesCollection.findOne({
      _id: challengeId,
      userId: this.userId,
    })

    if (!challenge) {
      throw new Meteor.Error("Access denied.")
    }

    ChallengesCollection.update(challengeId, {
      $set: {
        isCompleted,
      },
    })
  },
})
