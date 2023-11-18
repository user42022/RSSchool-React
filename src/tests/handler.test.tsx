import { expect, it } from 'vitest';
import { CharactersResponse, DetailedResponse } from '../types/types';
import { createCharacterFromParams } from './mocks/characters';

it('Should mock request with query', async () => {
  const link =
    'https://api.potterdb.com/v1/characters?filter[name_cont]=haha&page[size]=10&page[number]=1';
  const url = new URL(link);
  const response = await fetch(link);
  const data: CharactersResponse = await response.json();
  expect(data.data.length).toBe(10);
  expect(`${data.meta.pagination.current}`).toBe(
    url.searchParams.get('page[number]')
  );

  data.data.forEach((character) => {
    expect(character.attributes.name).toEqual(
      `name-${new URL(link).searchParams.get('filter[name_cont]')}`
    );
  });
});

it('Should mock request for character/:id path', async () => {
  const id = '99999999';
  const link = 'https://api.potterdb.com/v1/characters/' + id;

  const response = await fetch(link);
  const data: DetailedResponse = await response.json();
  expect(data.data).toEqual(createCharacterFromParams(id));
});
