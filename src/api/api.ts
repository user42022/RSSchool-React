import { Character, CharactersResponse, RequestParams } from '../types/types';

const source: string = 'https://api.potterdb.com/v1/';

const createRequestQuery = (
  requestParams: Partial<RequestParams>
): [string, Record<string, string>] => {
  const charactersLink = `${source}/characters`;

  const path = requestParams.path?.join('/') || '';
  const searchQuery = requestParams.query
    ? Object.entries(requestParams.query)
        .map((entry) => entry.join('='))
        .join('&')
    : '';

  const link =
    charactersLink +
    (path ? `/${path}` : path) +
    (searchQuery ? `/?${searchQuery}` : searchQuery);

  return [link, { method: 'GET' }];
};

export const getCharacters = async (searchQuery: RequestParams['query']) => {
  const fetchArgs = createRequestQuery({ query: searchQuery });
  const charactersResponse: CharactersResponse = await (
    await fetch(...fetchArgs)
  ).json();

  return charactersResponse;
};

export const getCharacterById = async (searchQuery: RequestParams['path']) => {
  const fetchArgs = createRequestQuery({ path: searchQuery });
  const charactersResponse: { data: Character } = await (
    await fetch(...fetchArgs)
  ).json();

  return charactersResponse;
};
