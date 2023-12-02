import React, { useState } from 'react';
import PropType from 'prop-types';
import NotesArchive from '../components/body/NotesArchive';
import { useNavigate } from 'react-router-dom';
import NotesSearchHeader from '../components/header/NotesSearchHeader';

function ArchivePage({ archived, onDelete, onMoveToActive, onSearch }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

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
        <p className="nothing-notes">Tidak ada catatan terarsipkan.</p>
      )}
    </div>
  );
}

ArchivePage.propType = {
  archived: PropType.array.isRequired,
  onDelete: PropType.func.isRequired,
  onMoveToActive: PropType.func.isRequired,
  onSearch: PropType.func.isRequired,
};

export default ArchivePage;
