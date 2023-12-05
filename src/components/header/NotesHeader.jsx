import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import ToggleTheme from '../ToggleTheme';
import { useLanguage } from '../../contexts/LanguageContext';

const NotesHeader = ({ logout, name }) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, changeLanguage } = useLanguage(); // Gunakan hook bahasa

  const toggleHamburgerMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsHamburgerMenuOpen((prev) => !prev);
  };

  const closeHamburgerMenu = () => {
    setIsHamburgerMenuOpen(false);
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 100);
  };

  useEffect(() => {
    document.addEventListener('click', closeHamburgerMenu);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', closeHamburgerMenu);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`header ${scrolled ? 'scrolled' : ''}`}>
      <h1>{language === 'id' ? 'Wow Catatan' : 'Wow Notes'}</h1>
      <Link className="hmb-toggle" to="#" onClick={toggleHamburgerMenu}>
        ☰
      </Link>
      <ul className={isHamburgerMenuOpen ? 'slide' : ''}>
        <li>
          <Link to="/">{language === 'id' ? 'Beranda' : 'Home'}</Link>
        </li>
        <li>
          <Link to="/add">{language === 'id' ? 'Tambah' : 'Add'}</Link>
        </li>
        <li>
          <Link to="/archive">{language === 'id' ? 'Arsip' : 'Archive'}</Link>
        </li>
        <li>
          <ToggleTheme />
        </li>
        <li>
          <button
            onClick={() => changeLanguage(language === 'id' ? 'en' : 'id')}
            className="language"
          >
            {language === 'id' ? 'en' : 'id'}
          </button>
        </li>
        <li>
          <button onClick={logout} className="logout">
            {name} <FiLogOut />
          </button>
        </li>
      </ul>
    </div>
  );
};

NotesHeader.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default NotesHeader;
