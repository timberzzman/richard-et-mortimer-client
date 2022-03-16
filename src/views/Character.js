import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { getCompleteCharacter } from '../services/characterService';
import { addFavorite, deleteFavorite, isFavorite } from '../services/favoritesService';

function Character() {
  const params = useParams();
  const [t] = useTranslation();
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
      return (<div className="h-4 w-4 rounded-full bg-green-600 mr-1 md:mr-2 mt-1 md:mt-2" />);
    } if (character.status === 'Dead') {
      return (<div className="h-4 w-4 rounded-full bg-red-600 mr-1 md:mr-2 mt-1 md:mt-2" />);
    }
    return (<div className="h-4 w-4 rounded-full bg-gray-300 mr-1 md:mr-2 mt-1 md:mt-2" />);
  }

  function characterEpisodes() {
    return (
      character.episode.map((episode, index) => (
        <div key={episode.id} className={`${index % 2 !== 0 ? 'bg-gray-500 dark:bg-gray-800' : 'bg-gray-400 dark:bg-gray-700'} p-3 lg:flex lg:justify-between lg:items-center`}>
          <div>
            <p>{episode.name}</p>
            <p>{episode.episode}</p>
          </div>
          <div>
            <Link to={`/episode/${episode.id}`} className="bg-blue-600 py-2 px-3 rounded">{t('readMoreButton')}</Link>
          </div>
        </div>
      ))
    );
  }

  if (Object.keys(character).length) {
    return (
      <section className="text-black dark:text-white text-left">
        <h1 className="md:w-3/4 pl-5 md:pl-0 md:mx-auto text-2xl md:text-6xl italic my-2 md:my-5">{t('mainInfoText')}</h1>
        <div className="mt-3 md:mx-auto mx-4 mb-3 md:w-1/2 border dark:border-gray-800 border dark:border-gray-800 rounded shadow-sm bg-gray-200 dark:bg-gray-800">
          <img className="h-32 md:h-64 w-32 md:w-64 my-5 mx-auto rounded-full" src={character.image} alt={character.name} />
          <div className="text-center">
            <h1 className="text-2xl md:text-6xl">{character.name}</h1>
          </div>
          <div className="text-left md:text-lg p-4">
            <div className="mb-2">
              <h2 className="text-lg md:text-3xl font-bold">{t('genderLabel')}</h2>
              <p className="italic">{character.gender}</p>
            </div>
            <div className="mb-2">
              <h2 className="text-lg md:text-3xl font-bold">{t('statusLabel')}</h2>
              <div className="flex">
                {getStatusPill()}
                <p className="italic">{character.status}</p>
              </div>
            </div>
            <div className="mb-2">
              <h2 className="text-lg md:text-3xl font-bold">{t('speciesLabel')}</h2>
              <p className="italic">{character.species}</p>
            </div>
            <div className="mb-2">
              <h2 className="text-lg md:text-3xl font-bold">{t('typeLabel')}</h2>
              <p className="italic">{character.type}</p>
            </div>
            <div className="mb-2">
              <h2 className="text-lg md:text-3xl font-bold">{t('originLabel')}</h2>
              {
                character.origin.name !== 'unknown'
                  ? <Link className="italic" to={`/location/${character.origin.id}`}>{character.origin.name}</Link>
                  : <p className="italic">{character.origin.name}</p>
              }
            </div>
            <div className="mb-2">
              <h2 className="text-lg md:text-3xl font-bold">{t('locationLabel')}</h2>
              {
                character.location.name !== 'unknown'
                  ? <Link className="italic" to={`/location/${character.location.id}`}>{character.location.name}</Link>
                  : <p className="italic">{character.location.name}</p>
              }
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
              { favorite ? t('deleteFavoriteButton') : t('addFavoriteButton') }
            </button>
          </div>
        </div>
        <h1 className="md:w-3/4 pl-5 md:pl-0 md:mx-auto text-2xl md:text-6xl italic my-2 md:my-5">{t('seenEpisodesText')}</h1>
        <div className="md:w-1/2 mx-4 my-5 md:mx-auto border shadow-md rounded">
          {character.episode && characterEpisodes()}
        </div>
      </section>
    );
  }
  return (
    <section className="text-black dark:text-white w-full flex justify-center items-center">
      <div className="mt-52">
        <p className="mb-5 text-6xl">{`${t('character')} ${t('isLoading')}`}</p>
      </div>
    </section>
  );
}

export default Character;
