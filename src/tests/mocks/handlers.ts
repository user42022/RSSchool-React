import { http, HttpResponse } from 'msw';
import { createCharacterFromParams } from './characters';
import {
  Character,
  CharactersResponse,
  DetailedResponse,
} from '../../types/types';

export const handlers = [
  http.get('https://api.potterdb.com/v1/characters', ({ request }) => {
    const url = new URL(request.url);
    const characters: Character[] = Array(
      Number(url.searchParams.get('page[size]')) || 0
    )
      .fill('')
      .map(() =>
        createCharacterFromParams({
          'filter[name_cont]': url.searchParams.get('filter[name_cont]'),
        })
      );

    const response: CharactersResponse = {
      data: characters,
      meta: {
        pagination: {
          current: Number(url.searchParams.get('page[number]')) || 1,
          records: 100,
        },
      },
    };

    return HttpResponse.json(response);
  }),
  http.get(
    'https://api.potterdb.com/v1/characters/:characterId',
    ({ params }) => {
      const { characterId } = params;

      const response: DetailedResponse = {
        data: createCharacterFromParams(`${characterId}`),
      };

      return HttpResponse.json(response);
    }
  ),
];
