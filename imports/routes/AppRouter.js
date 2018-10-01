import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from './../ui/Login';
import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';

export const history = createHistory();

export const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PublicRoute path="/" component={Login} exact={true} />
      <PublicRoute path="/signup" component={Signup}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  </Router>
);
