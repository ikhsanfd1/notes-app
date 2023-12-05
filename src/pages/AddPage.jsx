import React from 'react';
import PropTypes from 'prop-types';
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

AddPage.propTypes = {
  onAddNotes: PropTypes.func.isRequired,
  successMessage: PropTypes.string.isRequired,
  clearSuccessMessage: PropTypes.func.isRequired,
};

export default AddPage;
