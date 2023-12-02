import React from 'react';
import PropTypes from 'prop-types';
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

NotesArchive.propTypes = {
  archived: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMoveToActive: PropTypes.func.isRequired,
  isHomePage: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string,
};

export default NotesArchive;
