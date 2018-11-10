import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export const NoteListItem = (props) => {
  return (
    <Link to={"/dashboard/" + props.note._id }>
      <div className={(props.note.selected ? 'item__selected' : '')}>
        <h5>{ props.note.title || 'Untitled Note'}</h5>
        <p>{ moment(props.note.updatedAt).format('M/DD/YYYY') }</p>
      </div>
    </Link>
  );
};

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteListItem;