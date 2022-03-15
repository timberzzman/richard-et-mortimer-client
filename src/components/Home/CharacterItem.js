/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CharacterItem({ character, deleteFavoriteFn }) {
  const navigate = useNavigate();

  if (character) {
    return (
      <section>
        <div className="md:flex md:-mx-4">
          <div className="w-full mb-2 md:w-1/2 md:mx-4 border rounded shadow-sm">
            <img className="rounded" src={character.image} alt="text" />
            <div className="px-4 py-4">
              <div>
                <button
                  type="button"
                  onClick={() => navigate(`character/${character.id}`)}
                  className="font-semibold leading-tight text-2xl text-gray-800 hover:text-gray-800"
                >
                  {character.name}
                </button>
              </div>
              <hr className="border-gray-200 my-1 border-bottom-none" />
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
                <button type="button" onClick={() => deleteFavoriteFn('character', character.id)}>
                  Delete favorite
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CharacterItem;
