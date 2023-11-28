import React, { useState } from 'react';
import { showFormattedDate } from '../../utils/data';
import ButtonActive from '../button/ButtonActive';
import DeleteConfirmModal from '../modal/DeleteConfirmModal';
import MoveitConfirmModal from '../modal/MoveitConfirmModal';

function NotesArchiveList({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onMoveToActive,
}) {
  const formattedDate = showFormattedDate(createdAt);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMoveitModal, setShowMoveitModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleMoveit = () => {
    setShowMoveitModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setShowDeleteModal(false);
  };

  const handleConfirmMoveit = () => {
    onMoveToActive(id);
    setShowMoveitModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCancelMoveit = () => {
    setShowMoveitModal(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('delete-confirm-modal')) {
      setShowDeleteModal(false);
      setShowMoveitModal(false);
    }
  };

  return (
    <div className="notes-archive-list" onClick={handleOutsideClick}>
      <h3 className="title-archive">{title}</h3>
      <p className="date-archive">{formattedDate}</p>
      <p className="desc">{body}</p>
      <ButtonActive
        id={id}
        onDelete={handleDelete}
        onArchive={handleMoveit} // Panggil onMoveToActive dengan ID sebagai argumen
        isArchived={archived}
      />

      {showDeleteModal && (
        <DeleteConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {showMoveitModal && (
        <MoveitConfirmModal
          onConfirm={handleConfirmMoveit}
          onCancel={handleCancelMoveit}
        />
      )}
    </div>
  );
}

export default NotesArchiveList;
