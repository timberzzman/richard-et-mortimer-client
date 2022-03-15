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
    <section>
      <button type="button" onClick={() => getRandomCharacter()}>Character</button>
      <CharacterItem character={currentCharacter} />
    </section>
  );
}

export default Home;
