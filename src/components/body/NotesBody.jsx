import React from 'react';
import PropType from 'prop-types';
import NotesCreate from './NotesCreate';
import NotesActive from './NotesActive';
import NotesArchive from './NotesArchive';

class NotesBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: null,
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onMoveToActive = this.onMoveToActive.bind(this);
    this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
    this.clearSuccessMessage = this.clearSuccessMessage.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.handleSearch(this.props.searchQuery);
    }
  }

  onDeleteHandler(id) {
    const noteToMove = (this.state.searchResult || this.props.archived).find(
      (note) => note.id === id
    );
    this.props.onDelete(id, noteToMove);
  }

  onAddNotesHandler({ title, body }) {
    this.props.onAddNotes({ title, body });
  }

  clearSuccessMessage() {
    this.props.clearSuccessMessage();
  }

  onArchiveHandler(id) {
    this.props.onArchive(id);
  }

  onMoveToActive(id) {
    this.props.onMoveToActive(id);
  }

  handleSearch = (searchQuery) => {
    if (searchQuery.trim() === '') {
      this.setState({ searchResult: null });
    } else {
      const result = this.props.notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      this.setState({ searchResult: result });
    }
  };

  render() {
    const { searchResult } = this.state;
    const { notes, archived, searchQuery } = this.props;

    return (
      <div className="notes-body">
        {/* <NotesCreate
          addNotes={this.onAddNotesHandler}
          successMessage={this.props.successMessage}
        /> */}
        <NotesActive
          onSearch={this.handleSearch}
          notes={searchResult ? searchResult : notes}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
        />

        {notes.length === 0 && (
          <p className="nothing-notes">Tidak ada catatan.</p>
        )}

        <NotesArchive
          onSearch={this.handleSearch}
          archived={searchResult ? searchResult : archived}
          onDelete={this.onDeleteHandler}
          onMoveToActive={this.onMoveToActive}
          isHomePage={true}
          searchQuery={searchQuery}
        />
      </div>
    );
  }
}

NotesBody.propType = {
  searchQuery: PropType.string,
  notes: PropType.array.isRequired,
  archived: PropType.array.isRequired,
  onDelete: PropType.func.isRequired,
  onAddNotes: PropType.func.isRequired,
  onArchive: PropType.func.isRequired,
  onMoveToActive: PropType.func.isRequired,
};

export default NotesBody;
