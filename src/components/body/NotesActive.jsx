import React from 'react';
import NotesActiveList from './NotesActiveList';

function NotesActive({ notes, onDelete, onArchive }) {
  return (
    <div className="notes-active">
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

export default NotesActive;
