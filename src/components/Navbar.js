import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import darkModeContext from '../contexts/darkModeContext';

function Navbar() {
  const { darkMode, setDarkMode } = useContext(darkModeContext);

  return (
    <nav className="relative w-full flex flex-wrap justify-between py-3 bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
      <div className="px-3">
        <NavLink to="/">
          <FontAwesomeIcon icon={solid('house')} />
        </NavLink>
      </div>
      <div>
        <NavLink to="/character/1">
          Character
        </NavLink>
        <NavLink className="ml-2" to="/location/1">
          Locations
        </NavLink>
        <NavLink className="ml-2" to="/episode/1">
          Episode
        </NavLink>
        <NavLink className="ml-2" to="/favorites">
          Favorites
        </NavLink>
      </div>
      <div className="px-3 flex">
        <button type="button" onClick={() => setDarkMode(!darkMode)}>
          {
            darkMode ? <FontAwesomeIcon icon={solid('moon')} />
              : <FontAwesomeIcon icon={solid('sun')} />
          }
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
