import React, { useState } from "react"

export const ChallengeForm = () => {
  const [title, setTitle] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title) return

    Meteor.call("challenges.insert", title)

    setTitle("")
  }

  return (
    <form className="challenge-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new challenges"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">Add Challenge</button>
    </form>
  )
}
