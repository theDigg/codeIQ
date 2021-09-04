import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from '/imports/ui/themes';
import store from '../imports/ui/store';
import { Provider } from 'react-redux';
import { startGraphQLClient } from 'meteor/quave:graphql/client';
import { ApolloProvider } from '@apollo/react-hooks';

const apolloClient = startGraphQLClient({ connectToDevTools: true });

Meteor.startup(() => {
  render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </Provider>
    </ThemeProvider>,
    document.getElementById('react-target'),
  );
});
