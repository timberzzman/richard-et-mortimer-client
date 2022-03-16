/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFavorite, deleteFavorite, isFavorite } from '../../services/favoritesService';

function CharacterItem({ character, deleteFavoriteFn }) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (character) {
      setFavorite(isFavorite('character', character.id));
    }
  }, [character]);

  function getStatusPill() {
    if (character.status === 'Alive') {
      return (<div className="h-4 w-4 rounded-full bg-green-600 mr-2 mt-1" />);
    } if (character.status === 'Dead') {
      return (<div className="h-4 w-4 rounded-full bg-red-600 mr-2 mt-1" />);
    }
    return (<div className="h-4 w-4 rounded-full bg-gray-300 mr-2 mt-1" />);
  }

  if (character) {
    return (
      <div className="md:mx-auto mx-4 mb-2 md:w-1/2 border dark:border-gray-800 rounded shadow-sm bg-gray-200 dark:bg-gray-800 md:flex">
        <div className="h-32 w-32 mt-3 md:mt-0 mx-auto md:h-64 md:w-64 flex-none bg-cover bg-no-repeat rounded-full md:rounded-none md:rounded-l overflow-hidden" style={{ backgroundImage: `url(${character.image})` }} />
        <div className="px-2 py-3 md:px-4 md:py-4 text-black dark:text-white w-full md:flex md:justify-between md:flex-col">
          <div className="text-left text-md">
            <div className="text-center md:text-left">
              <button
                type="button"
                onClick={() => navigate(`character/${character.id}`)}
                className="text-center font-semibold leading-tight text-2xl md:text-4xl"
              >
                {character.name}
              </button>
            </div>
            <hr className="border-gray-600 dark:border-gray-800 my-1 border-bottom-none" />
            <p>
              Gender:&nbsp;
              {character.gender}
            </p>
            <div className="flex">
              {getStatusPill()}
              {character.status}
            </div>
            <p>
              Species:&nbsp;
              {character.species}
            </p>
            <p>
              {character.type}
            </p>
          </div>
          <div className="w-full flex text-gray-700 text-md justify-end mt-2">
            <button
              className={favorite ? 'py-2 px-3 rounded text-white bg-red-500' : 'py-2 px-3 rounded text-white bg-green-500'}
              type="button"
              onClick={() => {
                if (!favorite) addFavorite('character', character.id);
                else if (deleteFavoriteFn) {
                  deleteFavoriteFn('character', character.id);
                } else {
                  deleteFavorite('character', character.id);
                }
                setFavorite(!favorite);
              }}
            >
              { favorite ? 'Delete from favorites' : 'Add to favorites' }
            </button>
            <button
              type="button"
              onClick={() => navigate(`character/${character.id}`)}
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

export default CharacterItem;
