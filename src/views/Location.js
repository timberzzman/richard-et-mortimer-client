import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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

  function locationResidents() {
    return (
      location.residents.map((resident, index) => (
        <div key={resident.id} className={`${index % 2 !== 0 ? 'bg-gray-800' : 'bg-gray-700'} p-3 lg:flex lg:justify-between lg:items-center`}>
          <div className="lg:flex items-center text-center">
            <img className="mx-auto lg:flex-none h-24 md:h-32 w-24 md:w-32 rounded-full" src={resident.image} alt={resident.name} />
            <p className="pl-3 text-xl">{resident.name}</p>
          </div>
          <div className="my-5 lg:my-0 text-center">
            <Link to={`/character/${resident.id}`} className="bg-blue-600 py-2 px-3 rounded mx-auto">Read more</Link>
          </div>
        </div>
      ))
    );
  }

  if (Object.keys(location).length) {
    return (
      <section className="text-black dark:text-white text-left">
        <h1 className="md:w-3/4 pl-5 md:pl-0 md:mx-auto text-2xl md:text-6xl italic my-2 md:my-5">Main info</h1>
        <div className="mt-3 md:mx-auto mx-4 mb-3 md:w-1/2 border dark:border-gray-800 border dark:border-gray-800 rounded shadow-sm bg-gray-200 dark:bg-gray-800">
          <div className="text-center">
            <h1 className="text-2xl md:text-6xl">{location.name}</h1>
          </div>
          <div className="text-left md:text-lg p-4">
            <div className="mb-2">
              <h2 className="text-lg md:text-3xl font-bold">Type</h2>
              <p>{location.type}</p>
            </div>
            <div className="mb-2">
              <h2 className="text-lg md:text-3xl font-bold">Dimension</h2>
              <p>{location.dimension}</p>
            </div>
          </div>
          <div className="flex text-gray-700 text-md mt-3 justify-end p-4">
            <button
              className={favorite ? 'py-2 px-3 rounded text-white bg-red-500' : 'py-2 px-3 rounded text-white bg-green-500'}
              type="button"
              onClick={() => {
                if (!favorite) addFavorite('location', params.id);
                else deleteFavorite('location', params.id);
                setFavorite(!favorite);
              }}
            >
              { favorite ? 'Delete from favorites' : 'Add to favorites' }
            </button>
          </div>
        </div>
        <h1 className="md:w-3/4 pl-5 md:pl-0 md:mx-auto text-2xl md:text-6xl italic my-2 md:my-5">Residents</h1>
        <div className="md:w-1/2 mx-4 my-5 md:mx-auto border shadow-md rounded">
          {location.residents && locationResidents()}
        </div>
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
