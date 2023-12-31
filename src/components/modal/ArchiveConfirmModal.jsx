import React from 'react';
import PropTypes from 'prop-types';

function ArchiveConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="delete-confirm-modal">
      <p>Are you sure you want to archive this notes?</p>
      <button onClick={onCancel}>No</button>
      <button onClick={onConfirm}>Yes</button>
    </div>
  );
}

ArchiveConfirmModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ArchiveConfirmModal;
