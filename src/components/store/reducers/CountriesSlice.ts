import { createSlice } from '@reduxjs/toolkit';
import country_list from './countries';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: country_list,
  reducers: {},
});

export default countriesSlice.reducer;
