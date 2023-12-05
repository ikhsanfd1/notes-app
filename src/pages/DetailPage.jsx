import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getNote } from '../utils/network-data';
import { useLanguage } from '../contexts/LanguageContext';

const DetailPage = ({ notes, archived }) => {
  const { id } = useParams();
  const [selectedCatatan, setSelectedCatatan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { error, data } = await getNote(id);

        if (error) {
          console.error('Error fetching note:', error);
          return;
        }

        setSelectedCatatan(data);
      } catch (error) {
        console.error('Error fetching note:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <p className="wait">
        {language === 'id' ? 'Sedang memuat...' : 'Loading...'}
      </p>
    );
  }

  if (!selectedCatatan) {
    return (
      <p className="wait">
        {language === 'id' ? 'Catatan tidak ditemukan.' : 'Note not found.'}
      </p>
    );
  }

  return (
    <div className="detail-page">
      <h2 className="detail-catatan">
        {language === 'id' ? 'Detail Catatan' : 'Note Details'}
      </h2>
      <p className="detail-id">ID : {selectedCatatan.id}</p>
      <p className="detail-title">{selectedCatatan.title}</p>
      <p className="detail-body">{selectedCatatan.body}</p>
      <p className="detail-date">
        {language === 'id' ? 'Dibuat pada' : 'Created At'}:{' '}
        {new Date(selectedCatatan.createdAt).toLocaleString()}
      </p>
      <p className="detail-archive">
        {language === 'id' ? 'Diarsipkan' : 'Archived'} :{' '}
        {selectedCatatan.archived ? 'Yes' : 'No'}
      </p>
    </div>
  );
};

DetailPage.propTypes = {
  notes: PropTypes.array.isRequired,
  archived: PropTypes.array.isRequired,
};

export default DetailPage;
