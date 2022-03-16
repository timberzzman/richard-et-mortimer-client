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
      <div className="md:mx-auto mx-4 mb-2 md:w-1/2 border dark:border-gray-800 border dark:border-gray-800 rounded shadow-sm bg-gray-200 dark:bg-gray-800">
        <div className="px-2 py-3 md:px-4 md:py-4 text-black dark:text-white w-full">
          <div>
            <button
              type="button"
              onClick={() => navigate(`location/${location.id}`)}
              className="font-semibold leading-tight text-2xl md:text-4xl"
            >
              {location.name}
            </button>
          </div>
          <div className="text-left text-md md:text-xl">
            <hr className="border-gray-600 dark:border-gray-800 my-1 border-bottom-none" />
            <p>
              Type:&nbsp;
              {location.type}
            </p>
            <p>
              Dimension:&nbsp;
              {location.dimension}
            </p>
          </div>
          <div className="flex text-gray-700 text-md mt-2 justify-end">
            <button
              className={favorite ? 'py-2 px-3 rounded text-white bg-red-500' : 'py-2 px-3 rounded text-white bg-green-500'}
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
            <button
              type="button"
              onClick={() => navigate(`location/${location.id}`)}
              className="ml-2 py-2 px-3 rounded text-white bg-blue-600"
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default LocationItem;
