import React from 'react';

function ButtonActive({ id, onDelete, onEdit, onArchive, isArchived }) {
  return (
    <div className="button-active">
      <button type="button" id="deleteNotes" onClick={() => onDelete(id)}>
        Delete
      </button>

      <button type="button" id="archiveNotes" onClick={() => onArchive(id)}>
        {isArchived ? 'Move It' : 'Archive'}
      </button>
    </div>
  );
}

export default ButtonActive;
