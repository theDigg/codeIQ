import React from 'react';
import { Meteor } from 'meteor/meteor';
// import { Tracker } from 'meteor/tracker';
// import { Session } from 'meteor/session';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from '/imports/ui/App';
import { ThemeProvider } from '@material-ui/core/styles';
// import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@material-ui/core';
import theme from '/imports/ui/themes';
import store from '../imports/ui/store';
import { Provider } from 'react-redux';
// import '@material-tailwind/react/tailwind.css';
import { startGraphQLClient } from 'meteor/quave:graphql/client';
import { ApolloProvider } from '@apollo/react-hooks';

// if (Meteor.isClient) {
//   var someChallenge = new Meteor.Collection('challenge'); //messages is name of collection on client side

//   Tracker.autorun(() => {
//     Meteor.subscribe('challengeSub', { solution: Session.get('solution') }); //messagesSub tells the server which publish function to request data from
//     var challenge = someChallenge.findOne({});
//     if (challenge) console.log(challenge.m); // prints This is not from a database
//   });
// }

const apolloClient = startGraphQLClient({ connectToDevTools: true });

Meteor.startup(() => {
  render(
    <ThemeProvider theme={theme}>
      <Router>
        <Provider store={store}>
          <CssBaseline />
          <ApolloProvider client={apolloClient}>
            <App />
          </ApolloProvider>
        </Provider>
      </Router>
    </ThemeProvider>,
    document.getElementById('react-target'),
  );
});
