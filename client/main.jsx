import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from '/imports/ui/App';
import { ThemeProvider } from '@material-ui/core/styles';
// import { SnackbarProvider } from 'notistack';
import { CssBaseline } from '@material-ui/core';
import theme from '/imports/ui/themes';

Meteor.startup(() => {
  render(
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </ThemeProvider>,
    document.getElementById('react-target'),
  );
});
