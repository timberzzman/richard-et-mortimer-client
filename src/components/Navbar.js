import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="relative w-full flex flex-wrap justify-between py-3 bg-gray-900 text-gray-200">
      <div className="px-3">
        <NavLink to="/">
          home
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
      <div className="px-3">
        <p>Dark mode</p>
      </div>
    </nav>
  );
}

export default Navbar;
