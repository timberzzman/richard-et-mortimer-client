import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompleteEpisode } from '../services/EpisodeService';
import { addFavorite, deleteFavorite, isFavorite } from '../services/favoritesService';

function Episode() {
  const params = useParams();
  const [episode, setEpisode] = useState({});
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const getEpisode = async () => {
      const fetchedEpisode = await getCompleteEpisode(params.id);
      setEpisode(fetchedEpisode);
    };

    getEpisode();
    setFavorite(isFavorite('episode', params.id));
  }, []);

  if (Object.keys(episode).length) {
    return (
      <section>
        <p>{episode.name}</p>
        <p>{episode.episode}</p>
        <button
          type="button"
          onClick={() => {
            if (!favorite) addFavorite('episode', params.id);
            else deleteFavorite('episode', params.id);
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
      <p>Episode is loading...</p>
    </section>
  );
}

export default Episode;
