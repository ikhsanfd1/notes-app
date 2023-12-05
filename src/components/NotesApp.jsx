import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NotesHeader from '../components/header/NotesHeader';
import NotesBody from '../components/body/NotesBody';
import NotesFooter from '../components/footer/NotesFooter';
import ArchivePage from '../pages/ArchivePage';
import AddPage from '../pages/AddPage';
import DetailPage from '../pages/DetailPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ToggleTheme from './ToggleTheme';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import {
  getUserLogged,
  putAccessToken,
  addNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  getActiveNotes,
} from '../utils/network-data';

const NotesApp = () => {
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [notes, setNotes] = useState([]);
  const [archived, setArchived] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const themeContext = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await getUserLogged();
        setAuthedUser(data);

        const { error, data: activeNotes } = await getActiveNotes();

        if (error) {
          console.error('Error fetching active notes:', error);
          return;
        }

        setNotes(activeNotes);
      } catch (error) {
        console.error('Error fetching user data after login:', error);
        setAuthedUser(null);
      } finally {
        setLoading(false);
        setInitializing(false);
      }
    };

    fetchData();
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);

    try {
      const { data } = await getUserLogged();
      setAuthedUser(data);

      const { error, data: activeNotes } = await getActiveNotes();

      if (error) {
        console.error('Error fetching active notes:', error);
        return;
      }

      setNotes(activeNotes);
    } catch (error) {
      console.error('Error fetching user data after login:', error);
      setAuthedUser(null);
    }
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  const onDeleteHandler = async (id, noteToMove, isArchivePage) => {
    try {
      const { error } = await deleteNote(id);

      if (error) {
        console.error('Error deleting note:', error);
        return;
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

      if (isArchivePage) {
        setArchived((prevArchived) =>
          noteToMove
            ? prevArchived.filter((note) => note.id !== id)
            : prevArchived
        );
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const onAddNotesHandler = async ({ title, body }) => {
    try {
      const { error, data } = await addNote({ title, body });

      if (error) {
        console.error('Error adding note:', data);
        return;
      }

      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: data.id,
          title,
          body,
          createdAt: data.createdAt,
          archived: false,
        },
      ]);

      setSuccessMessage('Note berhasil ditambahkan!');
      setTimeout(() => {
        clearSuccessMessage();
        navigate('/');
      }, 500);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const clearSuccessMessage = () => {
    setSuccessMessage('');
  };

  const onArchiveHandler = async (id) => {
    try {
      const { error, data } = await archiveNote(id);

      if (error) {
        console.error('Error archiving note:', data);
        return;
      }

      const noteToArchive = notes.find((note) => note.id === id);
      if (noteToArchive) {
        setArchived((prevArchived) => [
          ...prevArchived,
          { ...noteToArchive, archived: true },
        ]);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      }
    } catch (error) {
      console.error('Error archiving note:', error);
    }
  };

  const onMoveToActive = async (id) => {
    try {
      const { error, data } = await unarchiveNote(id);

      if (error) {
        console.error('Error moving note to active:', data);
        return;
      }

      const noteToMove = archived.find((note) => note.id === id);
      if (noteToMove) {
        setNotes((prevNotes) => [
          ...prevNotes,
          { ...noteToMove, archived: false },
        ]);
        setArchived((prevArchived) =>
          prevArchived.filter((note) => note.id !== id)
        );
      }
    } catch (error) {
      console.error('Error moving note to active:', error);
    }
  };

  if (initializing) {
    return null;
  }

  if (loading) {
    return <p className="wait">Loading...</p>;
  }

  if (!themeContext) {
    return null;
  }

  const { theme } = themeContext;

  if (authedUser === null) {
    return (
      <div className={`notes-app ${theme}`}>
        <Routes>
          <Route
            path="/*"
            element={<LoginPage loginSuccess={onLoginSuccess} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route />
        </Routes>
      </div>
    );
  }

  return (
    <div className={`notes-app ${theme}`}>
      <NotesHeader logout={onLogout} name={authedUser.name} />

      <Routes>
        <Route
          path="/"
          element={
            <NotesBody
              onSearch={handleSearch}
              notes={notes}
              archived={archived}
              searchQuery={searchQuery}
              onDelete={onDeleteHandler}
              onAddNotes={onAddNotesHandler}
              clearSuccessMessage={clearSuccessMessage}
              onArchive={onArchiveHandler}
              onMoveToActive={onMoveToActive}
              successMessage={successMessage}
            />
          }
        />
        <Route
          path="/archive"
          element={
            <ArchivePage
              onSearch={handleSearch}
              searchQuery={searchQuery}
              archived={archived}
              onDelete={onDeleteHandler}
              onMoveToActive={onMoveToActive}
            />
          }
        />
        <Route
          path="/add"
          element={
            <AddPage
              onAddNotes={onAddNotesHandler}
              successMessage={successMessage}
              clearSuccessMessage={clearSuccessMessage}
            />
          }
        />
        <Route
          path="/detail/:id"
          element={<DetailPage notes={notes} archived={archived} />}
        />
      </Routes>
      <NotesFooter />
    </div>
  );
};

export default NotesApp;
