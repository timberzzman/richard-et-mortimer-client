import React, { useEffect, useState } from 'react';
import CharacterItem from '../components/Home/CharacterItem';
import { getCharacter, getCharactersCount } from '../services/characterService';

function Home() {
  const [count, setCount] = useState({});
  const [currentCharacter, setCurrentCharacter] = useState({});

  function getRandomInt(max) {
    return Math.floor(Math.random() * max + 1);
  }

  async function getRandomCharacter() {
    setCurrentCharacter({});
    const character = await getCharacter(getRandomInt(count.characters));
    setCurrentCharacter(character);
  }

  useEffect(() => {
    const setData = async () => {
      const charactersCount = await getCharactersCount();
      setCount((prevState) => ({ ...prevState, characters: charactersCount }));
      const character = await getCharacter(getRandomInt(charactersCount));
      setCurrentCharacter(character);
    };

    setData();
  }, []);

  return (
    <section className="mt-3">
      <div className="mb-3">
        <button type="button" className="text-md text-black p-3 rounded-md bg-gray-200 dark:text-white dark:bg-gray-800" onClick={() => getRandomCharacter()}>Character</button>
      </div>
      <CharacterItem character={currentCharacter} />
    </section>
  );
}

export default Home;
