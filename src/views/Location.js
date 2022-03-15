import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addFavorite, deleteFavorite, isFavorite } from '../services/favoritesService';
import { getCompleteLocation } from '../services/LocationService';

function Location() {
  const params = useParams();
  const [location, setLocation] = useState({});
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      const fetchedLocation = await getCompleteLocation(params.id);
      setLocation(fetchedLocation);
    };

    getLocation();
    setFavorite(isFavorite('location', params.id));
  }, []);

  if (Object.keys(location).length) {
    return (
      <section>
        <p>{location.name}</p>
        <p>{location.dimension}</p>
        <button
          type="button"
          onClick={() => {
            if (!favorite) addFavorite('location', params.id);
            else deleteFavorite('location', params.id);
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
      <p>Location is loading...</p>
    </section>
  );
}

export default Location;
