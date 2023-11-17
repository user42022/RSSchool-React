import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../../../types/types';

interface CharactersState {
  characters: Character[];
  detailedInfo: null | Character;
  pageSize: number;
  pageNumber: number;
  searchValue: string;
  records: number;
  isCharactersLoading: boolean;
  isDetailedInfoLoading: boolean;
}

const initialCharactersState: CharactersState = {
  characters: [],
  detailedInfo: null,
  pageSize: 10,
  pageNumber: 1,
  searchValue: '',
  records: 0,
  isCharactersLoading: false,
  isDetailedInfoLoading: false,
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: initialCharactersState,
  reducers: {},
});

export default charactersSlice.reducer;
