import React from 'react';

function DeleteConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="delete-confirm-modal">
      <p>Are you sure you want to delete this notes?</p>
      <button onClick={onCancel}>No</button>
      <button onClick={onConfirm}>Yes</button>
    </div>
  );
}

export default DeleteConfirmModal;
