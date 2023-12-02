import React from 'react';
import PropTypes from 'prop-types';

class NotesSearchHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
    };
  }

  handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });
    this.props.onSearch(searchQuery);
  };

  render() {
    return (
      <form className="form-search">
        <input
          type="text"
          placeholder="Search notes ..."
          id="searchNotes"
          value={this.state.searchQuery}
          onChange={this.handleSearchChange}
        />
      </form>
    );
  }
}

NotesSearchHeader.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default NotesSearchHeader;
