import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CharacterItem from '../components/Home/CharacterItem';
import EpisodeItem from '../components/Home/EpisodeItem';
import LocationItem from '../components/Home/LocationItem';
import { getCharacter, getCharactersCount } from '../services/characterService';
import { getEpisode, getEpisodesCount } from '../services/EpisodeService';
import { getLocation, getLocationsCount } from '../services/LocationService';

function Home() {
  const [count, setCount] = useState({});
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [t] = useTranslation();

  function getRandomInt(max) {
    return Math.floor(Math.random() * max + 1);
  }

  async function getRandomCharacter() {
    setCurrentCharacter(null);
    setCurrentEpisode(null);
    setCurrentLocation(null);
    const character = await getCharacter(getRandomInt(count.characters));
    setCurrentCharacter(character);
  }

  async function getRandomEpisode() {
    setCurrentCharacter(null);
    setCurrentEpisode(null);
    setCurrentLocation(null);
    const episode = await getEpisode(getRandomInt(count.episodes));
    setCurrentEpisode(episode);
  }

  async function getRandomLocation() {
    setCurrentCharacter(null);
    setCurrentEpisode(null);
    setCurrentLocation(null);
    const location = await getLocation(getRandomInt(count.locations));
    setCurrentLocation(location);
  }

  useEffect(() => {
    const setData = async () => {
      const charactersCount = await getCharactersCount();
      const episodesCount = await getEpisodesCount();
      const locationsCount = await getLocationsCount();
      setCount((prevState) => (
        {
          ...prevState,
          characters: charactersCount,
          episodes: episodesCount,
          locations: locationsCount,
        }
      ));
      const character = await getCharacter(getRandomInt(charactersCount));
      setCurrentCharacter(character);
    };

    setData();
  }, []);

  return (
    <section>
      <div className="mt-3 mb-3">
        <button type="button" className="text-md mx-3 text-black p-3 rounded-md bg-gray-200 dark:text-white dark:bg-gray-800" onClick={() => getRandomCharacter()}>{t('character')}</button>
        <button type="button" className="text-md mx-3 text-black p-3 rounded-md bg-gray-200 dark:text-white dark:bg-gray-800" onClick={() => getRandomLocation()}>{t('location')}</button>
        <button type="button" className="text-md mx-3 text-black p-3 rounded-md bg-gray-200 dark:text-white dark:bg-gray-800" onClick={() => getRandomEpisode()}>{t('episode')}</button>
      </div>
      <CharacterItem character={currentCharacter} />
      <LocationItem location={currentLocation} />
      <EpisodeItem episode={currentEpisode} />
    </section>
  );
}

export default Home;
