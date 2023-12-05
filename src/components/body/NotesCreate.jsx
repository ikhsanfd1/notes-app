import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CreateButton from '../button/CreateButton';
import { useLanguage } from '../../contexts/LanguageContext';

function NotesCreate({ addNotes }) {
  const { language } = useLanguage();

  const [state, setState] = React.useState({
    title: '',
    body: '',
    successMessage: '',
    errorMessage: '',
  });

  const onTitleChangeEventHandler = (event) => {
    const inputTitle = event.target.value;
    const truncatedTitle = inputTitle.slice(0, 50);
    setState((prevState) => ({
      ...prevState,
      title: truncatedTitle,
      errorMessage: '',
    }));
  };

  const onBodyChangeEventHandler = (event) => {
    setState((prevState) => ({
      ...prevState,
      body: event.target.value,
      errorMessage: '',
    }));
  };

  const onSubmitEventHandler = (event) => {
    event.preventDefault();

    if (!state.title.trim() || !state.body.trim()) {
      setState((prevState) => ({
        ...prevState,
        errorMessage:
          language === 'id'
            ? 'Tidak boleh ada yang kosong!'
            : 'Cannot be empty!',
      }));
      return;
    }

    addNotes(state);

    setState({
      successMessage:
        language === 'id'
          ? 'Note berhasil ditambahkan!'
          : 'Note added successfully!',
      title: '',
      body: '',
    });

    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        successMessage: '',
      }));
    }, 3000);
  };

  const remainingCharacters = 50 - state.title.length;

  return (
    <div className="notes-create">
      <h2>{language === 'id' ? 'Buat Catatan' : 'Create Notes'}</h2>
      <form onSubmit={onSubmitEventHandler}>
        <p>
          {language === 'id' ? 'Sisa Karakter' : 'Remaining Characters'}:{' '}
          {remainingCharacters}
        </p>
        <input
          type="text"
          placeholder={language === 'id' ? 'Judul' : 'Title'}
          value={state.title}
          onChange={onTitleChangeEventHandler}
        />
        <textarea
          className="description"
          placeholder={language === 'id' ? 'Deskripsi' : 'Description'}
          value={state.body}
          onChange={onBodyChangeEventHandler}
        />
        {state.errorMessage && (
          <p className="error-message">{state.errorMessage}</p>
        )}
        {state.successMessage && (
          <p className="success-message">{state.successMessage}</p>
        )}
        <CreateButton />
      </form>
    </div>
  );
}

NotesCreate.propTypes = {
  addNotes: PropTypes.func.isRequired,
};

export default NotesCreate;
