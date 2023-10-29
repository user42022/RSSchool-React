import { Response } from '../types/types';

const fetchQuery = async (fetchValue: string) => {
  const response: Response = await (
    await fetch(
      `https://rickandmortyapi.com/api/character/?name=${fetchValue}&limit=1&page=1`,
      { method: 'GET' }
    )
  ).json();

  return response?.results || [];
};

export default fetchQuery;
