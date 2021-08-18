import React, { useState } from "react"
import { useTracker } from "meteor/react-meteor-data"
import { Session } from "meteor/session"
import { ChallengesCollection } from "/imports/db/challenges"
import { ChallengeForm } from "./ChallengeForm"
import { Challenge } from "./Challenge"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"
import { Rooms } from "./Rooms"
import Editor from "@monaco-editor/react"

Session.set("challenge", "Fibonacci")

const toggleComplete = ({ _id, isCompleted }) =>
  Meteor.call("challenges.setCompleted", _id, !isCompleted)

const deleteChallenge = ({ _id }) => Meteor.call("challenges.remove", _id)

const logout = () => Meteor.logout()

console.log(Session.get("challenge"))

export const App = () => {
  const user = useTracker(() => Meteor.user())
  const [showCompleted, setShowCompleted] = useState(false)
  const [challengeTitle, setChallengeTitle] = useState('Fibonacci')
  // const showCompletedFilter = { isCompleted: { $ne: true } }
  // const userFilter = user ? { userId: user._id } : {}
  // const pendingOnlyFilter = { ...showCompletedFilter, ...userFilter }
  const challenge = useTracker(() => {
    if (!user) return []
    return ChallengesCollection.findOne(
      { title: Session.get("challenge") }
      // {
      //   sort: { createdAt: -1 },
      // }
    )
  })
  console.log(challenge)
  const pendingChallengeCount = useTracker(() => {
    if (!user) {
      return 0
    }

    return ChallengesCollection.find({}).count()
  })

  function handleEditorChange(value, event) {
    Meteor.call('challenges.edit', challenge._id, value)
  }

  return (
    <div>
      <h1>Challenges {pendingChallengeCount} </h1>
      {user ? (
        <>
          <Rooms />
          <Editor
            height="20vh"
            defaultLanguage="javascript"
            value={challenge.solution}
            onChange={handleEditorChange}
          />
          <button onClick={logout}>Logout</button>
          <ChallengeForm />
          <button onClick={() => setShowCompleted(!showCompleted)}>
            {showCompleted ? "Show All" : "Show Uncompleted"}
          </button>
          <input type="text" onChange={(e) => setChallengeTitle(e.target.value)}/>
          <button onClick={() => Session.set('challenge', challengeTitle)}>
            change session
          </button>
          <ul>
            {/* {challenges.map((challenge) => (
              <Challenge
                key={challenge._id}
                challenge={challenge}
                onCompleteClick={toggleComplete}
                onDeleteClick={deleteChallenge}
              />
            ))} */}
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
