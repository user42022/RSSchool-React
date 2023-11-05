import { CharacterResponse, GetCharacterParams } from '../types/types';

const source: string = 'https://api.potterdb.com/v1/';

const getCharacter = async <T>(
  getCharacterParams: GetCharacterParams | string
) => {
  const { data, meta }: CharacterResponse<T> = await (
    await fetch(
      `${source}/characters` +
        (typeof getCharacterParams === 'string'
          ? `/${getCharacterParams}`
          : `?page[size]=${getCharacterParams.pageSize}&page[number]=${getCharacterParams.pageNumber}&filter[name_cont]=${getCharacterParams.characterName}`),
      { method: 'GET' }
    )
  ).json();

  return (
    { data, meta } || {
      data: [],
      meta: {
        pagination: { current: 0, records: 0 },
        copyright: '',
        generated_at: '',
      },
    }
  );
};

export default getCharacter;
