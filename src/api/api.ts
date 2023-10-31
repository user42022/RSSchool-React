import { CharacterResponse } from '../types/types';

const getCharacter = async (characterName: string) => {
  const response: CharacterResponse = await (
    await fetch(
      `https://rickandmortyapi.com/api/character/?name=${characterName}&page=1`,
      { method: 'GET' }
    )
  ).json();

  return response.results || [];
};

export default getCharacter;
