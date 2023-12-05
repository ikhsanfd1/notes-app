import React, { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

function CreateButton() {
  const { language } = useLanguage();

  useEffect(() => {}, [language]);

  return (
    <div className="create-button">
      <button type="submit">{language === 'id' ? 'Tambah' : 'Create'}</button>
    </div>
  );
}

export default CreateButton;
