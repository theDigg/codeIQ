import { Meteor } from "meteor/meteor"
import React, { useState } from "react"

export const SignupForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const submit = (e) => {
    e.preventDefault()

    Meteor.loginWithGithub(
      {
        requestPermissions: ["user", "public_repo"],
      },
      (error) => {
        if (error) {
          console.log(error)
        }
      }
    )
  }

  return (
    <form onSubmit={submit} className="login-form">
      <label htmlFor="username">Username</label>

      <input
        type="text"
        placeholder="Username"
        name="username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password</label>

      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Sign up</button>
    </form>
  )
}
