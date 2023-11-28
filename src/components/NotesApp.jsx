import React from 'react';
import { getInitialData } from '../utils/data';
import NotesHeader from './header/NotesHeader';
import NotesBody from './body/NotesBody';
import NotesFooter from './footer/NotesFooter';

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      archived: [],
      searchQuery: '', // Tambahkan searchQuery di state
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = (searchQuery) => {
    this.setState({
      searchQuery: searchQuery,
    });
  };

  // Fungsi-fungsi ini dipindahkan dari NotesBody agar state dapat dibagi dengan komponen lainnya
  onDeleteHandler = (id, noteToMove) => {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== id),
      archived: noteToMove
        ? prevState.archived.filter((note) => note.id !== id)
        : prevState.archived,
    }));
  };

  onAddNotesHandler = ({ title, body }) => {
    this.setState(
      (prevState) => ({
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: +new Date(),
            archived: false,
          },
        ],
        successMessage: 'Note berhasil ditambahkan!',
      }),
      () => {
        setTimeout(() => {
          this.clearSuccessMessage();
        }, 3000);
      }
    );
  };

  clearSuccessMessage = () => {
    this.setState({
      successMessage: '',
    });
  };

  onArchiveHandler = (id) => {
    const noteToArchive = this.state.notes.find((note) => note.id === id);

    if (noteToArchive) {
      // Tambahkan note ke dalam archived
      this.setState((prevState) => ({
        archived: [...prevState.archived, { ...noteToArchive, archived: true }],
        notes: prevState.notes.filter((note) => note.id !== id), // Hapus dari notes
      }));
    }
  };

  onMoveToActive = (id) => {
    const noteToMove = this.state.archived.find((note) => note.id === id);

    if (noteToMove) {
      // Pindahkan note ke dalam notes
      this.setState((prevState) => ({
        notes: [...prevState.notes, { ...noteToMove, archived: false }],
        archived: prevState.archived.filter((note) => note.id !== id), // Hapus dari archived
      }));
    }
  };

  render() {
    const { notes, archived, searchQuery, successMessage } = this.state;

    return (
      <div className="notes-app">
        <NotesHeader onSearch={this.handleSearch} />
        <NotesBody
          notes={notes}
          archived={archived}
          searchQuery={searchQuery}
          onDelete={this.onDeleteHandler}
          onAddNotes={this.onAddNotesHandler}
          clearSuccessMessage={this.clearSuccessMessage}
          onArchive={this.onArchiveHandler}
          onMoveToActive={this.onMoveToActive}
          successMessage={successMessage}
        />
        <NotesFooter />
      </div>
    );
  }
}

export default NotesApp;
