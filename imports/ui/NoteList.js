import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../api/notes';
import { PropTypes } from 'prop-types';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import { NoteListEmptyItem } from './NoteListEmptyItem';


export const NoteList = (props) => {
  return (
    <div>
      <NoteListHeader />
      { props.notes.length ? props.notes.map((note) => {
          let selected = note._id === props.selectedNoteId ? true : false;
          return <NoteListItem key={note._id} note={note} selected={selected}/>;
      }) : <NoteListEmptyItem/>}
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