import React from 'react';
import PropType from 'prop-types';
import NotesArchiveList from './NotesArchiveList';

function NotesArchive({
  archived,
  onDelete,
  onMoveToActive,
  isHomePage,
  onSearch,
  searchQuery,
}) {
  if (isHomePage) {
    return null;
  }

  const filteredArchived = archived.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h2>Archive</h2>
      {filteredArchived.map((note) => (
        <NotesArchiveList
          key={note.id}
          id={note.id}
          onDelete={() => onDelete(note.id, note, true)}
          onMoveToActive={onMoveToActive}
          {...note}
        />
      ))}
    </>
  );
}

NotesArchive.propType = {
  archived: PropType.array.isRequired,
  onDelete: PropType.func.isRequired,
  onMoveToActive: PropType.func.isRequired,
  isHomePage: PropType.bool.isRequired,
  searchQuery: PropType.string,
};

export default NotesArchive;
