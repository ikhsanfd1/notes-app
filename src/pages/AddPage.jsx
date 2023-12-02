import React from 'react';
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

export default AddPage;
