import React from 'react';
import PropType from 'prop-types';
import NotesCreate from '../components/body/NotesCreate';

function AddPage({ onAddNotes, successMessage, clearSuccessMessage }) {
  return (
    <>
      <NotesCreate
        addNotes={onAddNotes}
        successMessage={successMessage}
        clearSuccessMessage={clearSuccessMessage}
      />
    </>
  );
}

AddPage.propType = {
  onAddNotes: PropType.func.isRequired,
};

export default AddPage;
