import { CharacterResponse, GetCharacterParams } from '../types/types';

const source: string = 'https://api.potterdb.com/v1/';

const getCharacter = async (getCharacterParams: GetCharacterParams) => {
  const { id, pageSize, pageNumber, characterName } = getCharacterParams;
  const response: CharacterResponse = await (
    await fetch(
      `${source}/characters` +
        (id
          ? `/${id}`
          : `?page[size]=${pageSize}&page[number]=${pageNumber}&filter[name_cont]=${characterName}`),
      { method: 'GET' }
    )
  ).json();

  return response.data || [];
};

export default getCharacter;
