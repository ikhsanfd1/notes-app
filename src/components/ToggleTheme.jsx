// ToggleTheme.jsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function ToggleTheme() {
  const themeContext = useTheme();

  if (!themeContext) {
    return null;
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <button onClick={toggleTheme} className="toggle-theme">
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
}

export default ToggleTheme;
