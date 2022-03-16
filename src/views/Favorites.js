import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CharacterItem from '../components/Home/CharacterItem';
import EpisodeItem from '../components/Home/EpisodeItem';
import LocationItem from '../components/Home/LocationItem';
import { getCharactersByID } from '../services/characterService';
import { getEpisodeByID } from '../services/EpisodeService';
import { deleteFavorite, getFavorites } from '../services/favoritesService';
import { getLocationsByID } from '../services/LocationService';

function Favorites() {
  const [t] = useTranslation();
  const [favorites, setFavorites] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const getFavoritesDatas = async () => {
      const localFavorites = getFavorites();
      setFavorites(localFavorites);
      const characterids = [];
      const locationids = [];
      const episodeids = [];
      if (localFavorites) {
        localFavorites.forEach((favorite) => {
          switch (favorite.type) {
            case 'character':
              characterids.push(favorite.id);
              break;
            case 'episode':
              episodeids.push(favorite.id);
              break;
            case 'location':
              locationids.push(favorite.id);
              break;
            default:
              break;
          }
        });
        const fetchedCharacters = await getCharactersByID(characterids);
        setCharacters(fetchedCharacters);
        const fetchedEpisodes = await getEpisodeByID(episodeids);
        setEpisodes(fetchedEpisodes);
        const fetchedLocations = await getLocationsByID(locationids);
        setLocations(fetchedLocations);
      }
    };

    getFavoritesDatas();
  }, []);

  const deleteLocalFavorite = (favoriteType, favoriteID) => {
    deleteFavorite(favoriteType, favoriteID);
    let newFavorite = favorites;
    newFavorite = newFavorite.filter(
      (favorite) => favorite.id !== favoriteID || favorite.type !== favoriteType,
    );
    if (!newFavorite.length) {
      newFavorite = null;
    }
    setFavorites(newFavorite);
  };

  if (!favorites) {
    return (
      <section className="text-black dark:text-white w-full flex justify-center items-center">
        <div className="mt-52">
          <p className="mb-5">{t('noFavoriteMessage')}</p>
          <Link to="/" className="bg-blue-600 rounded py-2 px-3">{t('goToHomeButton')}</Link>
        </div>
      </section>
    );
  }
  return (
    <section className="mt-3">
      {
        favorites.map((favorite) => {
          if (favorite.type === 'character') {
            if (characters.length) {
              const displayedCharacter = characters.find(
                (character) => character.id === favorite.id,
              );
              return (
                <div key={`${favorite.type}-${favorite.id}`}>
                  <CharacterItem
                    character={displayedCharacter}
                    deleteFavoriteFn={deleteLocalFavorite}
                  />
                </div>
              );
            }
          } else if (favorite.type === 'episode') {
            if (episodes.length) {
              const displayedEpisode = episodes.find(
                (episode) => episode.id === favorite.id,
              );
              return (
                <div key={`${favorite.type}-${favorite.id}`}>
                  <EpisodeItem
                    episode={displayedEpisode}
                    deleteFavoriteFn={deleteLocalFavorite}
                  />
                </div>
              );
            }
          } else if (favorite.type === 'location') {
            if (locations.length) {
              const displayedLocation = locations.find(
                (location) => location.id === favorite.id,
              );
              return (
                <div key={`${favorite.type}-${favorite.id}`}>
                  <LocationItem
                    location={displayedLocation}
                    deleteFavoriteFn={deleteLocalFavorite}
                  />
                </div>
              );
            }
          }
          return '';
        })
      }
    </section>
  );
}

export default Favorites;
