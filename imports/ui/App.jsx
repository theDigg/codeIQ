import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
// import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { setAuth } from './features/auth/authSlice'
import { useDispatch } from 'react-redux'
// import { Session } from 'meteor/session';
// import ChallengesCollection from '/imports/db/challenges';
// import RoomsCollection from '/imports/db/rooms';
// import Editor from '@monaco-editor/react';
// import LoginForm from './LoginForm';
// import SignupForm from './SignupForm';
// import Rooms from './Rooms';
// import PaneWindows from './PaneWindows';
import PrivateRoute from './Components/PrivateRoute';
import Drawer from './Components/Drawer';
import Welcome from './pages/Welcome'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account';
import Battle from './pages/Battle';
import Duel from './pages/Duel';
import TimeTrial from './pages/TimeTrial';
import Practice from './pages/Practice';
import Leaderboard from './pages/Leaderboard';
import Progress from './pages/Progress';
import TopUsers from './pages/TopUsers';
import Messages from './pages/Messages';
import Settings from './pages/Settings';

// Session.set('challenge', 'Fibonacci');

// const toggleComplete = ({ _id, isCompleted }) => Meteor.call('challenges.setCompleted', _id, !isCompleted);

// const deleteChallenge = ({ _id }) => Meteor.call('challenges.remove', _id);

// const logout = () => Meteor.logout();

// console.log(Session.get('challenge'));

export const App = () => {
  const dispatch = useDispatch()
  const user = useTracker(() => Meteor.user());
  dispatch(setAuth(user))
  const [showCompleted, setShowCompleted] = useState(false);
  const [challengeTitle, setChallengeTitle] = useState('Fibonacci');
  // const showCompletedFilter = { isCompleted: { $ne: true } }
  // const userFilter = user ? { userId: user._id } : {}
  // const pendingOnlyFilter = { ...showCompletedFilter, ...userFilter }
  // const room = useTracker(() => {
  //   if (!user) return [];
  //   return RoomsCollection.findOne(
  //     { _id: Session.get('room') },
  //     // {
  //     //   sort: { createdAt: -1 },
  //     // }
  //   );
  // });
  // // console.log(user, room);
  // const pendingChallengeCount = useTracker(() => {
  //   if (!user) {
  //     return 0;
  //   }

  //   return ChallengesCollection.find({}).count();
  // });

  function handleEditorChange(value, event) {
    Meteor.call('challenges.edit', room.challenge._id, value);
  }

  // const editor = <Editor height="90vh" defaultLanguage="javascript" value={room?.challenge?.solution} onChange={handleEditorChange} />;
  // const panes = <PaneWindows topLeft={<Rooms />} topRight={editor} bottomLeft={editor} bottomRight={editor} />;

  return (
    <>
      <Drawer>
        <Switch>
          <Route exact path="/">
            <Welcome/>
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/account">
            <Account user={user} />
          </PrivateRoute>
          <PrivateRoute path="/battle">
            <Battle user={user} />
          </PrivateRoute>
          <PrivateRoute path="/duel">
            <Duel />
          </PrivateRoute>
          <PrivateRoute path="/time-trial">
            <TimeTrial />
          </PrivateRoute>
          <PrivateRoute path="/practice">
            <Practice />
          </PrivateRoute>
          <PrivateRoute path="/leaderboard">
            <Leaderboard />
          </PrivateRoute>
          <PrivateRoute path="/top-users">
            <TopUsers />
          </PrivateRoute>
          <PrivateRoute path="/progress">
            <Progress />
          </PrivateRoute>
          <PrivateRoute path="/messages">
            <Messages />
          </PrivateRoute>
          <PrivateRoute path="/settings">
            <Settings />
          </PrivateRoute>
        </Switch>
      </Drawer>
    </>
  );
};
