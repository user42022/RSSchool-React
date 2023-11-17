import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharactersResponse, DetailedResponse } from '../types/types';

export const potterAPI = createApi({
  reducerPath: 'potterAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.potterdb.com/v1/' }),
  endpoints: (builder) => ({
    getDetailedInfoById: builder.query<DetailedResponse, string>({
      query: (detailedId) => `characters/${detailedId}`,
    }),
    getCharacters: builder.query<CharactersResponse, Record<string, string>>({
      query: (queryArgs) => ({
        url: 'characters',
        params: {
          'filter[name_cont]': queryArgs.characterName,
          'page[size]': queryArgs.pageSize,
          'page[number]': queryArgs.pageNumber,
        },
      }),
    }),
  }),
});

export const { useGetCharactersQuery, useGetDetailedInfoByIdQuery } = potterAPI;
