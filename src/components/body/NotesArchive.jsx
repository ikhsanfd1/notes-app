import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import NotesArchiveList from './NotesArchiveList';
import { useLanguage } from '../../contexts/LanguageContext';

function NotesArchive({
  archived,
  onDelete,
  onMoveToActive,
  isHomePage,
  onSearch,
  searchQuery,
}) {
  const { language } = useLanguage();

  useEffect(() => {
    console.log(`Language is ${language}`);
  }, [language]);

  if (isHomePage) {
    return null;
  }

  const filteredArchived = archived.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h2>{language === 'id' ? 'Catatan Arsip' : 'Archive Notes'}</h2>
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
