import React from 'react';
import PropTypes from 'prop-types';

function DeleteConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="delete-confirm-modal">
      <p>Are you sure you want to delete this notes?</p>
      <button onClick={onCancel}>No</button>
      <button onClick={onConfirm}>Yes</button>
    </div>
  );
}

DeleteConfirmModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmModal;
