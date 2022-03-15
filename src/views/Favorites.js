import React, { useEffect, useState } from 'react';
import CharacterItem from '../components/Home/CharacterItem';
import { getCharactersByID } from '../services/characterService';
import { deleteFavorite, getFavorites } from '../services/favoritesService';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getFavoritesDatas = async () => {
      const localFavorites = getFavorites();
      setFavorites(localFavorites);
      const characterids = [];
      if (localFavorites) {
        localFavorites.forEach((favorite) => {
          switch (favorite.type) {
            case 'character':
              characterids.push(favorite.id);
              break;
            default:
              break;
          }
        });
        const fetchedCharacters = await getCharactersByID(characterids);
        setCharacters(fetchedCharacters);
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
    setFavorites(newFavorite);
  };

  if (!favorites) {
    return (
      <div>
        <p>There is no favorites</p>
      </div>
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
          }
          return '';
        })
      }
    </section>
  );
}

export default Favorites;
