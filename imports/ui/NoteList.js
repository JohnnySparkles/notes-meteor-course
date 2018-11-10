import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../api/notes';
import { PropTypes } from 'prop-types';
import NoteListHeader from './NoteListHeader';
import NoteListeItem from './NoteListItem';


export const NoteList = (props) => {
  return (
    <div>
      <NoteListHeader />
      { props.notes.map((note) => {
          return <NoteListeItem note={note} />;
      })}
      NoteList {props.notes.length}
    </div>
  )
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default withTracker(({}) => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  }
})(NoteList);