import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route, Redirect } from 'react-router-dom';

export const PublicRouteImpl = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} render={(props) => (
      isAuthenticated ? (<Redirect to={"/dashboard"} />) : (<Component {...props}/>))}/>
);

export default PublicRoute = withTracker(({}) => {
  return {isAuthenticated: !!Meteor.userId()};
})(PublicRouteImpl);


