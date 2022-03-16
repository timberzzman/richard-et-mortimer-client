import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { getCompleteEpisode } from '../services/EpisodeService';
import { addFavorite, deleteFavorite, isFavorite } from '../services/favoritesService';
import getEpisodefromTMDB from '../services/TMDBService';

function Episode() {
  const params = useParams();
  const [t] = useTranslation();
  const [episode, setEpisode] = useState({});
  const [episodeDetails, setEpisodeDetails] = useState({});
  const [favorite, setFavorite] = useState(false);

  // eslint-disable-next-line no-shadow
  async function getEpisodeDetails(episodeValue) {
    const [episodeSeason, episodeNumber] = episodeValue.match(/[0-9]{2}/g);
    const result = await getEpisodefromTMDB(episodeSeason, episodeNumber);
    setEpisodeDetails(result);
  }

  useEffect(() => {
    const getEpisode = async () => {
      const fetchedEpisode = await getCompleteEpisode(params.id);
      getEpisodeDetails(fetchedEpisode.episode);
      setEpisode(fetchedEpisode);
    };

    getEpisode();
    setFavorite(isFavorite('episode', params.id));
  }, []);

  function episodeCharacters() {
    return (
      episode.characters.map((character, index) => (
        <div key={character.id} className={`${index % 2 !== 0 ? 'bg-gray-800' : 'bg-gray-700'} p-3 lg:flex lg:justify-between lg:items-center`}>
          <div className="lg:flex items-center text-center">
            <img className="mx-auto lg:flex-none h-24 md:h-32 w-24 md:w-32 rounded-full" src={character.image} alt={character.name} />
            <p className="pl-3 text-xl">{character.name}</p>
          </div>
          <div className="my-5 lg:my-0 text-center">
            <Link to={`/character/${character.id}`} className="bg-blue-600 py-2 px-3 rounded mx-auto">{t('readMoreButton')}</Link>
          </div>
        </div>
      ))
    );
  }

  if (Object.keys(episode).length) {
    return (
      <section className="text-black dark:text-white text-left">
        <h1 className="md:w-3/4 pl-5 md:pl-0 md:mx-auto text-2xl md:text-6xl italic my-2 md:my-5">{t('mainInfoText')}</h1>
        <div className="mt-3 md:mx-auto mx-4 mb-3 md:w-1/2 border dark:border-gray-800 border dark:border-gray-800 rounded shadow-sm bg-gray-200 dark:bg-gray-800">
          <div className="text-center">
            <h1 className="text-2xl md:text-6xl">{episode.name}</h1>
          </div>
          <div className="text-left md:text-lg p-4">
            <div className="mb-2">
              <h2 className="text-lg md:text-3xl font-bold">{t('episode')}</h2>
              <p className="italic">{episode.episode}</p>
            </div>
            <div className="mb-2">
              <h2 className="text-lg md:text-3xl font-bold">{t('airDateLabel')}</h2>
              <p className="italic">{episode.air_date}</p>
            </div>
            <div>
              <h2 className="text-lg md:text-3xl font-bold">{t('overviewLabel')}</h2>
              {episodeDetails && episodeDetails.overview}
            </div>
          </div>
          <div className="flex text-gray-700 text-md mt-3 justify-end p-4">
            <button
              className={favorite ? 'py-2 px-3 rounded text-white bg-red-500' : 'py-2 px-3 rounded text-white bg-green-500'}
              type="button"
              onClick={() => {
                if (!favorite) addFavorite('episode', params.id);
                else deleteFavorite('episode', params.id);
                setFavorite(!favorite);
              }}
            >
              { favorite ? t('deleteFavoriteButton') : t('addFavoriteButton') }
            </button>
          </div>
        </div>
        <h1 className="md:w-3/4 pl-5 md:pl-0 md:mx-auto text-2xl md:text-6xl italic my-2 md:my-5">{}</h1>
        <div className="md:w-1/2 mx-4 my-5 md:mx-auto border shadow-md rounded">
          {episode.characters && episodeCharacters()}
        </div>
      </section>
    );
  }
  return (
    <section className="text-black dark:text-white w-full flex justify-center items-center">
      <div className="mt-52">
        <p className="mb-5 text-6xl">{`${t('episode')} ${t('isLoading')}`}</p>
      </div>
    </section>
  );
}

export default Episode;
