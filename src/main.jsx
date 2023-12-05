import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import NotesApp from './components/NotesApp';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

// styling
import './sass/main.scss';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <LanguageProvider>
        <NotesApp />
      </LanguageProvider>
    </ThemeProvider>
  </BrowserRouter>
);
