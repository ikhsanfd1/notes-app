import React from 'react';
import NotesSearchHeader from './NotesSearchHeader';

class NotesHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <h1>Wow Notes</h1>
        <NotesSearchHeader onSearch={this.props.onSearch} />
      </div>
    );
  }
}

export default NotesHeader;
