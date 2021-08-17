import React, { useState } from "react"
import { useTracker } from "meteor/react-meteor-data"
import { ChallengesCollection } from "/imports/db/challenges"
import { ChallengeForm } from "./ChallengeForm"
import { Challenge } from "./Challenge"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"
import { Rooms } from "./Rooms"

const toggleComplete = ({ _id, isCompleted }) =>
  Meteor.call("challenges.setCompleted", _id, !isCompleted)

const deleteChallenge = ({ _id }) => Meteor.call("challenges.remove", _id)

const logout = () => Meteor.logout()

export const App = () => {
  const user = useTracker(() => Meteor.user())
  const [showCompleted, setShowCompleted] = useState(false)
  const showCompletedFilter = { isCompleted: { $ne: true } }
  const userFilter = user ? { userId: user._id } : {}
  const pendingOnlyFilter = { ...showCompletedFilter, ...userFilter }
  const challenges = useTracker(() => {
    if (!user) return []
    return ChallengesCollection.find(
      showCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch()
  })
  const pendingChallengeCount = useTracker(() => {
    if (!user) {
      return 0
    }

    return ChallengesCollection.find(pendingOnlyFilter).count()
  })
  return (
    <div>
      <h1>Challenges {pendingChallengeCount} </h1>
      {user ? (
        <>
          <Rooms />
          <button onClick={logout}>Logout</button>
          <ChallengeForm />
          <button onClick={() => setShowCompleted(!showCompleted)}>
            {showCompleted ? "Show All" : "Show Uncompleted"}
          </button>
          <ul>
            {challenges.map((challenge) => (
              <Challenge
                key={challenge._id}
                challenge={challenge}
                onCompleteClick={toggleComplete}
                onDeleteClick={deleteChallenge}
              />
            ))}
          </ul>
        </>
      ) : (
        <>
          <LoginForm />
          <SignupForm />
        </>
      )}
    </div>
  )
}
