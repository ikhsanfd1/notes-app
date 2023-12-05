import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../../contexts/LanguageContext';
import NotesCreate from './NotesCreate';
import NotesActive from './NotesActive';
import NotesArchive from './NotesArchive';

function NotesBody(props) {
  const {
    searchQuery,
    notes,
    archived,
    onDelete,
    onAddNotes,
    onArchive,
    onMoveToActive,
  } = props;
  const { language } = useLanguage();
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResult(null);
    } else {
      const result = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResult(result);
    }
  }, [searchQuery, notes]);

  return (
    <div className="notes-body">
      {/* <NotesCreate
        addNotes={onAddNotes}
        successMessage={props.successMessage}
      /> */}
      <NotesActive
        onSearch={(query) =>
          setSearchResult(
            query
              ? notes.filter((note) =>
                  note.title.toLowerCase().includes(query.toLowerCase())
                )
              : null
          )
        }
        notes={searchResult || notes}
        onDelete={onDelete}
        onArchive={onArchive}
      />

      {notes.length === 0 && (
        <p className="nothing-notes">
          {language === 'id' ? 'Tidak ada catatan.' : 'No notes.'}
        </p>
      )}

      <NotesArchive
        onSearch={(query) =>
          setSearchResult(
            query
              ? notes.filter((note) =>
                  note.title.toLowerCase().includes(query.toLowerCase())
                )
              : null
          )
        }
        archived={searchResult || archived}
        onDelete={onDelete}
        onMoveToActive={onMoveToActive}
        isHomePage={true}
        searchQuery={searchQuery}
      />
    </div>
  );
}

NotesBody.propTypes = {
  searchQuery: PropTypes.string,
  notes: PropTypes.array.isRequired,
  archived: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddNotes: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onMoveToActive: PropTypes.func.isRequired,
};

export default NotesBody;
