import React, { useEffect, useState } from 'react';
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
      getFavorites().forEach((favorite) => {
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
    };

    getFavoritesDatas();
  }, []);

  function deleteLocalFavorite(favoriteType, favoriteID) {
    deleteFavorite(favoriteType, favoriteID);
  }

  return (
    <section>
      {
        favorites.map((favorite) => {
          if (favorite.type === 'character') {
            if (characters.length) {
              const displayedCharacter = characters.find(
                (character) => character.id === favorite.id,
              );
              return (
                <div key={`${favorite.type}-${favorite.id}`}>
                  <p>{displayedCharacter.name}</p>
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
