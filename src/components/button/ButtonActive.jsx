import React from 'react';
import PropTypes from 'prop-types';
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

ButtonActive.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  isArchived: PropTypes.bool.isRequired,
};

export default ButtonActive;
