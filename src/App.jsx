import React, {
  useEffect, useMemo, useState,
} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Router from './Router';
import darkModeContext from './contexts/darkModeContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const darkModeValue = useMemo(() => ({ darkMode, setDarkMode }), [darkMode]);

  function switchDarkMode() {
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', JSON.stringify(true));
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', JSON.stringify(false));
    }
  }

  useEffect(() => () => {
    switchDarkMode();
  }, [darkMode]);

  useEffect(() => {
    const localDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (localDarkMode) {
      setDarkMode(true);
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      setDarkMode(true);
    }
  }, []);

  return (
    <div className="App h-100">
      <darkModeContext.Provider value={darkModeValue}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Router />
          </div>
        </BrowserRouter>
      </darkModeContext.Provider>
    </div>
  );
}

export default App;
