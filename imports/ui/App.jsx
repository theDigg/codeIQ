import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { setAuth } from './features/auth/authSlice';
import { useDispatch } from 'react-redux';
import Drawer from './components/Drawer';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account';
import Battle from './pages/Battle';
import Golf from './pages/Golf';
import Duel from './pages/Duel';
import TimeTrial from './pages/TimeTrial';
import Practice from './pages/Practice';
import Leaderboard from './pages/Leaderboard';
import Progress from './pages/Progress';
import TopUsers from './pages/TopUsers';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import 'setimmediate';
// import { io } from 'socket.io-client';

// const socket = io();

// socket.on('connect', () => {
//   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
//   console.log(socket.connected); // true
// });

// socket.on('test', (message) => {
//   console.log(message);
// });

// socket.on('disconnect', () => {
//   console.log(socket.id); // undefined
//   console.log(socket.connected); // false
// });

const App = () => {
  const dispatch = useDispatch();
  useTracker(() => dispatch(setAuth(Meteor.user())));

  return (
    <Router>
      <Drawer>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/account" component={Account} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/battle" component={Battle} />
          <ProtectedRoute path="/golf" component={Golf} />
          <ProtectedRoute path="/duel" component={Duel} />
          <ProtectedRoute path="/time-trial" component={TimeTrial} />
          <ProtectedRoute path="/practice" component={Practice} />
          <ProtectedRoute path="/leaderboard" component={Leaderboard} />
          <ProtectedRoute path="/top-users" component={TopUsers} />
          <ProtectedRoute path="/progress" component={Progress} />
          <ProtectedRoute path="/messages" component={Messages} />
          <ProtectedRoute path="/settings" component={Settings} />
          <AdminProtectedRoute path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </Drawer>
    </Router>
  );
};

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return isLogged && isAdmin ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
    }}
  />
);

export default App;
