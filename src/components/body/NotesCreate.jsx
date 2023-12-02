import React from 'react';
import PropTypes from 'prop-types';
import CreateButton from '../button/CreateButton';

class NotesCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      successMessage: '',
      errorMessage: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const inputTitle = event.target.value;
    const truncatedTitle = inputTitle.slice(0, 50);
    this.setState({
      title: truncatedTitle,
      errorMessage: '',
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState({
      body: event.target.value,
      errorMessage: '',
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    if (!this.state.title.trim() || !this.state.body.trim()) {
      this.setState({
        errorMessage: 'Tidak boleh ada yang kosong!',
      });
      return;
    }

    this.props.addNotes(this.state);

    this.setState({
      successMessage: 'Note berhasil ditambahkan!',
      title: '',
      body: '',
    });

    setTimeout(() => {
      this.setState({
        successMessage: '',
      });
    }, 3000);
  }

  render() {
    const remainingCharacters = 50 - this.state.title.length;

    return (
      <div className="notes-create">
        <h2>Create Notes</h2>
        <form onSubmit={this.onSubmitEventHandler}>
          <p>Sisa Karakter: {remainingCharacters}</p>
          <input
            type="text"
            placeholder="Title"
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
          />
          <textarea
            className="description"
            placeholder="Description"
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
          />
          {this.state.errorMessage && (
            <p className="error-message">{this.state.errorMessage}</p>
          )}
          {this.state.successMessage && (
            <p className="success-message">{this.state.successMessage}</p>
          )}
          <CreateButton />
        </form>
      </div>
    );
  }
}

NotesCreate.propTypes = {
  addNotes: PropTypes.func.isRequired,
  successMessage: PropTypes.string.isRequired,
  clearSuccessMessage: PropTypes.func.isRequired,
};

export default NotesCreate;
