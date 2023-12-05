import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NotesActiveList from './NotesActiveList';
import NotesSearchHeader from '../header/NotesSearchHeader';
import { useLanguage } from '../../contexts/LanguageContext';

function NotesActive({ notes, onDelete, onArchive, onSearch }) {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [language]);

  if (loading) {
    return <p className="wait">Loading...</p>;
  }

  return (
    <div className="notes-active">
      <NotesSearchHeader onSearch={onSearch} />
      <h2>{language === 'id' ? 'Catatan Aktif' : 'Notes Active'}</h2>
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
