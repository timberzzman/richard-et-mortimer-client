import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCompleteCharacter } from '../services/characterService';
import { addFavorite, deleteFavorite, isFavorite } from '../services/favoritesService';

function Character() {
  const params = useParams();
  const [character, setCharacter] = useState({});
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const getCharacter = async () => {
      const fetchedCharacter = await getCompleteCharacter(params.id);
      setCharacter(fetchedCharacter);
    };

    getCharacter();
    setFavorite(isFavorite('character', params.id));
  }, []);

  function getStatusPill() {
    if (character.status === 'Alive') {
      return (<div className="h-4 w-4 rounded-full bg-green-600 mr-2 mt-2" />);
    } if (character.status === 'Dead') {
      return (<div className="h-4 w-4 rounded-full bg-red-600 mr-2 mt-2" />);
    }
    return (<div className="h-4 w-4 rounded-full bg-gray-300 mr-2 mt-2" />);
  }

  function characterEpisodes() {
    return (
      character.episode.map((episode, index) => (
        <div key={episode.id} className={`${index % 2 !== 0 ? 'bg-gray-800' : 'bg-gray-700'} p-5 flex justify-between items-center`}>
          <div>
            <p>{episode.name}</p>
            <p>{episode.episode}</p>
          </div>
          <div>
            <Link to={`/episode/${episode.id}`} className="bg-blue-600 py-2 px-3 rounded">Read more</Link>
          </div>
        </div>
      ))
    );
  }

  if (Object.keys(character).length) {
    return (
      <section className="text-black dark:text-white text-left">
        <h1 className="w-3/4 mx-auto text-6xl italic">Main info</h1>
        <div className="mt-3 md:mx-auto mx-4 mb-3 md:w-1/2 border dark:border-gray-800 border dark:border-gray-800 rounded shadow-sm bg-gray-200 dark:bg-gray-800">
          <img className="h-64 w-64 my-5 mx-auto rounded-full" src={character.image} alt={character.name} />
          <div className="text-center">
            <h1 className="text-6xl">{character.name}</h1>
          </div>
          <div className="text-left text-lg p-4">
            <div className="mb-2">
              <h2 className="text-3xl font-bold">Gender</h2>
              <p>{character.gender}</p>
            </div>
            <div className="mb-2">
              <h2 className="text-3xl font-bold">Status</h2>
              <div className="flex">
                {getStatusPill()}
                <p>{character.status}</p>
              </div>
            </div>
            <div className="mb-2">
              <h2 className="text-3xl font-bold">Species</h2>
              <p>{character.species}</p>
            </div>
            <div className="mb-2">
              <h2 className="text-3xl font-bold">Type</h2>
              <p>{character.type}</p>
            </div>
            <div className="mb-2">
              <h2 className="text-3xl font-bold">Origin</h2>
              <p>{character.origin.name}</p>
            </div>
            <div className="mb-2">
              <h2 className="text-3xl font-bold">Current location</h2>
              <p>{character.location.name}</p>
            </div>
          </div>
          <div className="flex text-gray-700 text-md mt-3 justify-end p-4">
            <button
              className={favorite ? 'py-2 px-3 rounded text-white bg-red-500' : 'py-2 px-3 rounded text-white bg-green-500'}
              type="button"
              onClick={() => {
                if (!favorite) addFavorite('character', params.id);
                else deleteFavorite('character', params.id);
                setFavorite(!favorite);
              }}
            >
              { favorite ? 'Delete from favorites' : 'Add to favorites' }
            </button>
          </div>
        </div>
        <h1 className="w-3/4 mx-auto text-6xl italic">Seen in episodes</h1>
        <div className="md:w-1/2 my-5 mx-auto border shadow-md rounded">
          {character.episode && characterEpisodes()}
        </div>
      </section>
    );
  }
  return (
    <section>
      <p>Character is loading...</p>
    </section>
  );
}

export default Character;
