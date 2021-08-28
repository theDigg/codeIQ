import React from 'react';
import { Meteor } from 'meteor/meteor';
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

Meteor.startup(() => {
  render(
    <ThemeProvider theme={theme}>
      <Router>
        <Provider store={store}>
          <CssBaseline />
          <App />
        </Provider>
      </Router>
    </ThemeProvider>,
    document.getElementById('react-target'),
  );
});
