import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';


export const NoteListItem = (props) => {
  return (
    <div>
      <h5>{ props.note.title || 'Untitled Note'}</h5>
      <p>{ moment(props.note.updatedAt).format('M/DD/YYYY') }</p>
    </div>
  )
};

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteListItem;