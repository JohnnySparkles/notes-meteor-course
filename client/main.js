// Package Imports
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';

// Application Imports
import { AppRouter } from './../imports/routes/AppRouter';
import './main.html';


Meteor.startup(() => {
  ReactDOM.render(<AppRouter />, document.getElementById('app'));
});


