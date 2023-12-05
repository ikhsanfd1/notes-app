import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../../utils/index';
import ButtonActive from '../button/ButtonActive';
import DeleteConfirmModal from '../modal/DeleteConfirmModal';
import ArchiveConfirmModal from '../modal/ArchiveConfirmModal';

function NotesActiveList({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onArchive,
}) {
  const formattedDate = showFormattedDate(createdAt);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleArchive = () => {
    setShowArchiveModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setShowDeleteModal(false);
  };

  const handleConfirmArchive = () => {
    onArchive(id);
    setShowArchiveModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCancelArchive = () => {
    setShowArchiveModal(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('delete-confirm-modal')) {
      setShowDeleteModal(false);
      setShowArchiveModal(false);
    }
  };

  return (
    <div className="notes-active-list" onClick={handleOutsideClick}>
      <h3 className="title-active">{title}</h3>
      <p className="date-active">{formattedDate}</p>
      <p className="desc">{body}</p>
      <ButtonActive
        id={id}
        onDelete={handleDelete}
        onArchive={handleArchive}
        isArchived={archived}
      />

      {showDeleteModal && (
        <DeleteConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {showArchiveModal && (
        <ArchiveConfirmModal
          onConfirm={handleConfirmArchive}
          onCancel={handleCancelArchive}
        />
      )}
    </div>
  );
}

NotesActiveList.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NotesActiveList;
