import React from 'react';
import NotesArchiveList from './NotesArchiveList';

function NotesArchive({ archived, onDelete, onMoveToActive }) {
  return (
    <div className="notes-archive">
      <h2>Archive</h2>
      {archived.map((note) => (
        <NotesArchiveList
          key={note.id}
          id={note.id}
          onDelete={onDelete}
          onMoveToActive={onMoveToActive}
          {...note}
        />
      ))}
    </div>
  );
}

export default NotesArchive;
