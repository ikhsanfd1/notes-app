import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesBody from '../components/body/NotesBody';
import { getActiveNotes, deleteNote } from '../utils/network-data';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notesActive, setNotesActive] = useState([]);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('keyword') || '';
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getActiveNotes();
        setNotesActive(data);
      } catch (error) {
        console.error('Error fetching active notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function onDeleteHandler(id) {
    try {
      await deleteNote(id);

      const { data } = await getActiveNotes();
      setNotesActive(data);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotesActive = notesActive.filter((noteActive) => {
    return noteActive.name.toLowerCase().includes(keyword.toLowerCase());
  });

  if (loading) {
    return <p className="wait">Loading...</p>;
  }

  return (
    <NotesBody
      keyword={keyword}
      notesActive={filteredNotesActive}
      onDelete={onDeleteHandler}
      keywordChange={onKeywordChangeHandler}
    />
  );
}

export default HomePage;
