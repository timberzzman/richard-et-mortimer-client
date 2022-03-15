/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFavorite, deleteFavorite, isFavorite } from '../../services/favoritesService';

function LocationItem({ location, deleteFavoriteFn }) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (location) {
      setFavorite(isFavorite('character', location.id));
    }
  }, [location]);

  if (location) {
    return (
      <section>
        <div>
          <div className="w-full mb-2 md:w-1/2 md:mx-4 border dark:border-gray-800 rounded shadow-sm bg-gray-200 dark:bg-gray-800">
            <div className="px-4 py-4">
              <div>
                <button
                  type="button"
                  onClick={() => navigate(`location/${location.id}`)}
                  className="font-semibold leading-tight text-2xl text-black dark:text-white hover:text-gray-800"
                >
                  {location.name}
                </button>
              </div>
              <hr className="border-gray-600 dark:border-gray-800 my-1 border-bottom-none" />
              <p className="text-gray-900">
                Bootstrap card example using tailwind css with horizontal line below card title to
                distinguish design.
              </p>
              <div className="flex text-gray-700 text-sm">
                <div className="pr-3">May 6, 2020</div>
                <div>
                  Posted by
                  <span className="text-red-400">Admin</span>
                </div>
                <button
                  className="px-3 bg-green-500 rounded text-white"
                  type="button"
                  onClick={() => {
                    if (!favorite) addFavorite('location', location.id);
                    else if (deleteFavoriteFn) {
                      deleteFavoriteFn('location', location.id);
                    } else {
                      deleteFavorite('location', location.id);
                    }
                    setFavorite(!favorite);
                  }}
                >
                  { favorite ? 'Delete from favorites' : 'Add to favorites' }
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return null;
}

export default LocationItem;
