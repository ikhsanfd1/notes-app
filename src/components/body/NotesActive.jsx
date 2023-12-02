import React from 'react';
import PropType from 'prop-types';
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

NotesActive.propType = {
  notes: PropType.array.isRequired,
  onDelete: PropType.func.isRequired,
  onArchive: PropType.func.isRequired,
  onSearch: PropType.func.isRequired,
};

export default NotesActive;
