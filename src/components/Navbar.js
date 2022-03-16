import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import darkModeContext from '../contexts/darkModeContext';

function Navbar() {
  const [t] = useTranslation('translation');
  const { darkMode, setDarkMode } = useContext(darkModeContext);

  return (
    <nav className="relative w-full flex flex-wrap justify-between py-3 bg-gray-200 dark:bg-gray-800 text-black dark:text-white text-lg font-bold">
      <div className="pl-3">
        <NavLink to="/favorites">
          <span className="hidden md:block">{t('navbarFavorites')}</span>
          <FontAwesomeIcon icon={solid('heart')} className="md:hidden text-red-700" />
        </NavLink>
      </div>
      <div>
        <NavLink to="/">
          {t('navbarTitle')}
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
