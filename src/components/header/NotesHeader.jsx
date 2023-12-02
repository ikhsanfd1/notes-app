import React from 'react';
import { Link } from 'react-router-dom';

class NotesHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHamburgerMenuOpen: false,
      scrolled: false,
    };

    this.toggleHamburgerMenu = this.toggleHamburgerMenu.bind(this);
    this.closeHamburgerMenu = this.closeHamburgerMenu.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.closeHamburgerMenu);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeHamburgerMenu);
    window.removeEventListener('scroll', this.handleScroll);
  }

  toggleHamburgerMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState((prevState) => ({
      isHamburgerMenuOpen: !prevState.isHamburgerMenuOpen,
    }));
  }

  closeHamburgerMenu() {
    this.setState({
      isHamburgerMenuOpen: false,
    });
  }

  handleScroll = () => {
    if (window.scrollY > 100) {
      this.setState({
        scrolled: true,
      });
    } else {
      this.setState({
        scrolled: false,
      });
    }
  };

  render() {
    const { isHamburgerMenuOpen, scrolled } = this.state;

    return (
      <div className={`header ${scrolled ? 'scrolled' : ''}`}>
        <h1>Wow Notes</h1>
        <Link className="hmb-toggle" to="#" onClick={this.toggleHamburgerMenu}>
          ☰
        </Link>
        <ul className={isHamburgerMenuOpen ? 'slide' : ''}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add</Link>
          </li>
          <li>
            <Link to="/archive">Archive</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NotesHeader;
