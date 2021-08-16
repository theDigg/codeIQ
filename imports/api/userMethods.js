import { check } from "meteor/check"
import { Accounts } from "meteor/accounts-base"

Meteor.methods({
  "users.create"(username, password) {
    check(username, String)
    check(password, String)

    Accounts.createUser({ username, password })
  },
})
