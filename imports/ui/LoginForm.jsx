import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
  };

  const loginWithGithub = (e) => {
    e.preventDefault();

    Meteor.loginWithGithub(
      {
        requestPermissions: ['user', 'public_repo'],
      },
      (error) => {
        if (error) {
          console.log(error);
        }
      },
    );
  };

  const loginWithFacebook = (e) => {
    e.preventDefault();
    Meteor.loginWithFacebook(
      {
        requestPermissions: ['user_friends', 'public_profile', 'email'],
      },
      (err) => {
        if (err) console.log(err);
      },
    );
  };

  const loginWithGoogle = (e) => {
    e.preventDefault();
    const { scope } = ServiceConfiguration.configurations.findOne({ service: 'google' });

    Meteor.loginWithGoogle({ requestPermissions: scope, requestOfflineToken: true, loginUrlParameters: { hd: '*' } }, (error) => {
      if (error) {
        console.log(error);
      }
    });
  };

  return (
    <form onSubmit={submit} className="login-form">
      <label htmlFor="username">Username</label>

      <input type="text" placeholder="Username" name="username" required onChange={(e) => setUsername(e.target.value)} />

      <label htmlFor="password">Password</label>

      <input type="password" placeholder="Password" name="password" required onChange={(e) => setPassword(e.target.value)} />

      <button type="submit">Login</button>
      <button onClick={loginWithGithub}>Login with Github</button>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </form>
  );
};
