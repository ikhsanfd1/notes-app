import React from 'react';
import { Link } from 'react-router-dom';

function ButtonActive({ id, onDelete, onArchive, isArchived }) {
  return (
    <div className="button-active">
      <button type="button" id="deleteNotes" onClick={() => onDelete(id)}>
        Delete
      </button>
      <Link to={`/detail/${id}`}>
        <button type="button" id="detailNotes">
          See Detail
        </button>
      </Link>
      <button type="button" id="archiveNotes" onClick={() => onArchive(id)}>
        {isArchived ? 'Move It' : 'Archive'}
      </button>
    </div>
  );
}

export default ButtonActive;
