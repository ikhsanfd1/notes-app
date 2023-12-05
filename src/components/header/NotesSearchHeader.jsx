import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../../contexts/LanguageContext';

const NotesSearchHeader = ({ onSearch }) => {
  const { language } = useLanguage();

  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  useEffect(() => {
    // Dapatkan nilai bahasa saat komponen dimount
    console.log(`Language is ${language}`);
    // Lakukan sesuatu dengan nilai bahasa jika diperlukan
  }, [language]);

  return (
    <form className="form-search">
      <input
        type="text"
        placeholder={
          language === 'id' ? 'Cari catatan ...' : 'Search notes ...'
        }
        id="searchNotes"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </form>
  );
};

NotesSearchHeader.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default NotesSearchHeader;
