import React from 'react';
import PropType from 'prop-types';

function ArchiveConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="delete-confirm-modal">
      <p>Are you sure you want to archive this notes?</p>
      <button onClick={onCancel}>No</button>
      <button onClick={onConfirm}>Yes</button>
    </div>
  );
}

ArchiveConfirmModal.propType = {
  onConfirm: PropType.func.isRequired,
  onCancel: PropType.func.isRequired,
};

export default ArchiveConfirmModal;
