import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NotesArchive from '../components/body/NotesArchive';
import { useNavigate } from 'react-router-dom';
import NotesSearchHeader from '../components/header/NotesSearchHeader';
import { useLanguage } from '../contexts/LanguageContext';

function ArchivePage({ archived, onDelete, onMoveToActive, onSearch }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { language } = useLanguage();

  useEffect(() => {
    // Dapatkan nilai bahasa saat komponen dimount
    console.log(`Language is ${language}`);
    // Lakukan sesuatu dengan nilai bahasa jika diperlukan
  }, [language]);

  const handleMoveToHome = () => {
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="notes-archive">
      <NotesSearchHeader onSearch={handleSearch} />
      <NotesArchive
        archived={archived}
        onDelete={onDelete}
        onMoveToActive={onMoveToActive}
        searchQuery={searchQuery}
        isHomePage={false}
      />
      {archived.length === 0 && (
        <p className="nothing-notes">
          {language === 'id'
            ? 'Tidak ada catatan terarsipkan.'
            : 'No notes to archive'}
        </p>
      )}
    </div>
  );
}

ArchivePage.propTypes = {
  archived: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMoveToActive: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default ArchivePage;
