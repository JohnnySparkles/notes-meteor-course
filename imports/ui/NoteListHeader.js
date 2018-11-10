import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';


export const NoteListHeader = (props) => {
  return (
    <button onClick={() => {props.meteorCall('notes.insert')}}>Create Note</button>
  );
};

export default withTracker(({}) => {
  return {
    meteorCall: Meteor.call
  };
})(NoteListHeader);