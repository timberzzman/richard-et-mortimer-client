/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LocationItem({ location, deleteFavoriteFn }) {
  const navigate = useNavigate();

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
                <button type="button" onClick={() => deleteFavoriteFn('location', location.id)}>
                  Delete favorite
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
