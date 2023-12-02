// NotesApp.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  getAllNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
  addNote,
} from '../utils/data';
import NotesHeader from '../components/header/NotesHeader';
import NotesBody from '../components/body/NotesBody';
import NotesFooter from '../components/footer/NotesFooter';
import ArchivePage from '../pages/ArchivePage';
import AddPage from '../pages/AddPage';
import DetailPage from '../pages/DetailPage';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const NotesApp = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState(getAllNotes());
  const [archived, setArchived] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  const onDeleteHandler = (id, noteToMove, isArchivePage) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

    if (isArchivePage) {
      setArchived((prevArchived) =>
        noteToMove
          ? prevArchived.filter((note) => note.id !== id)
          : prevArchived
      );
    }
  };

  const onAddNotesHandler = ({ title, body }) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: +new Date(),
        title,
        body,
        createdAt: +new Date(),
        archived: false,
      },
    ]);
    setSuccessMessage('Note berhasil ditambahkan!');
    setTimeout(() => {
      clearSuccessMessage();
    }, 3000);
  };

  const clearSuccessMessage = () => {
    setSuccessMessage('');
  };

  const onArchiveHandler = (id) => {
    const noteToArchive = notes.find((note) => note.id === id);
    if (noteToArchive) {
      setArchived((prevArchived) => [
        ...prevArchived,
        { ...noteToArchive, archived: true },
      ]);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  };

  const onMoveToActive = (id) => {
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
  };

  return (
    <div className="notes-app">
      <NotesHeader />
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
