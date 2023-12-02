import React from 'react';
import PropTypes from 'prop-types';
import NotesActiveList from './NotesActiveList';
import NotesSearchHeader from '../header/NotesSearchHeader';

function NotesActive({ notes, onDelete, onArchive, onSearch }) {
  return (
    <div className="notes-active">
      <NotesSearchHeader onSearch={onSearch} />
      <h2>Notes Active</h2>
      {notes.map((note) => (
        <NotesActiveList
          key={note.id}
          id={note.id}
          onDelete={onDelete}
          onArchive={onArchive}
          {...note}
        />
      ))}
    </div>
  );
}

NotesActive.propTypes = {
  notes: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default NotesActive;
