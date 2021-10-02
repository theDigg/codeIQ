import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';
import CssBaseline from '@mui/material/CssBaseline';
import store from '../imports/ui/store';
import { Provider } from 'react-redux';

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>,
    document.getElementById('react-target'),
  );
});
