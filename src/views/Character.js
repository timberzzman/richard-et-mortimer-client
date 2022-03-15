import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  if (Object.keys(character).length) {
    return (
      <section>
        <p>{character.name}</p>
        <p>{character.status}</p>
        <button
          type="button"
          onClick={() => {
            if (!favorite) addFavorite('character', params.id);
            else deleteFavorite('character', params.id);
            setFavorite(!favorite);
          }}
        >
          { favorite ? 'Delete from favorites' : 'Add to favorites' }
        </button>
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
