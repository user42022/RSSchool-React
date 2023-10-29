import { ReactNode } from 'react';

export type ResponseInfo = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

export type CharacterData = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: [string];
  url: string;
  created: string;
};

export type CharacterResponse = {
  info: ResponseInfo;
  results: CharacterData[];
};

export type CardProps = {
  name: string;
  status: string;
  imageUrl: string;
};

export type ErrorBoundaryProps = { children: ReactNode };

export type ErrorBoundaryState = { error: null | Error };

export type ErrorButtonState = { error: boolean };

export type SearchFormProps = { callback: (value: string) => void };

export type SearchFormState = { characterName: string };

export type AppState = {
  characterName: string;
  isFetching: boolean;
  characters: CharacterData[];
};
