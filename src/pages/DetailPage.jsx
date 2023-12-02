import React from 'react';
import PropType from 'prop-types';
import { useParams } from 'react-router-dom';

const DetailPage = ({ notes, archived }) => {
  const { id } = useParams();

  const selectedNote = notes.find((note) => note.id.toString() === id);
  const selectedArchived = archived.find((note) => note.id.toString() === id);

  const selectedCatatan = selectedNote || selectedArchived;

  if (!selectedCatatan) {
    return <p>Catatan tidak ditemukan.</p>;
  }

  return (
    <div className="detail-page">
      <h2 className="detail-catatan">Detail Catatan</h2>
      <p className="detail-id">ID : {selectedCatatan.id}</p>
      <p className="detail-title">{selectedCatatan.title}</p>
      <p className="detail-body">{selectedCatatan.body}</p>
      <p className="detail-date">
        Created At: {new Date(selectedCatatan.createdAt).toLocaleString()}
      </p>
      <p className="detail-archive">
        Archived : {selectedCatatan.archived ? 'Yes' : 'No'}
      </p>
    </div>
  );
};

DetailPage.propType = {
  notes: PropType.array.isRequired,
  archived: PropType.array.isRequired,
};

export default DetailPage;
