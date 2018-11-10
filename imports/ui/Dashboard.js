import React from 'react';
import PrivateHeader from './../ui/PrivateHeader';
import NoteList from './NoteList';


export default Dashboard = (props) => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <NoteList selectedNoteId={props.match.params.id}/>
      </div>
    </div>
  );
}




