import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Character, CharactersResponse } from '../../../types/types';

const searchParams = new URLSearchParams(window.location.href);

interface CharactersState {
  characters: Character[];
  detailedCharacterId: null | string;
  detailedCharacterInfo: null | Character;
  pageSize: number;
  pageNumber: number;
  searchValue: string;
  records: number;
  isCharactersLoading: boolean;
  isDetailedInfoLoading: boolean;
}

const initialCharactersState: CharactersState = {
  characters: [],
  detailedCharacterId: searchParams.get('detailedId'),
  detailedCharacterInfo: null,
  pageSize: 10,
  pageNumber: Number(searchParams.get('pageNumber')) || 1,
  searchValue:
    searchParams.get('characterName') ||
    localStorage.getItem('cachedName') ||
    '',
  records: 0,
  isCharactersLoading: false,
  isDetailedInfoLoading: false,
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: initialCharactersState,
  reducers: {
    updatePageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload || 10;
    },
    updateSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    updateFromURL: (
      state,
      action: PayloadAction<Record<string, string | null>>
    ) => {
      state.pageNumber = Number(action.payload['pageNumber']) || 1;
      state.searchValue = action.payload['characterName'] || '';
      state.detailedCharacterId = action.payload['detailedId'] || null;
    },
    updateIsLoadingCharacters: (state, action: PayloadAction<boolean>) => {
      state.isCharactersLoading = action.payload;
    },
    updateIsLoadingDetailedInfo: (state, action: PayloadAction<boolean>) => {
      state.isDetailedInfoLoading = action.payload;
    },
    updateDetailedInfo: (state, action: PayloadAction<Character>) => {
      state.detailedCharacterInfo = action.payload;
    },
    updateRecords: (state, action: PayloadAction<number>) => {
      state.records = action.payload;
    },
    updateCharacters: (state, action: PayloadAction<CharactersResponse>) => {
      state.records = action.payload.meta.pagination.records;
      state.characters = action.payload.data;
    },
  },
});

export default charactersSlice.reducer;
