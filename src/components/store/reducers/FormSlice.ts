import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SubmitedForm {
  name: string;
  age: string;
  email: string;
  password: string;
  gender: string;
  accept: string;
  image: string | ArrayBuffer | null;
  country: string;
  date: number;
}

interface StoredData {
  data: SubmitedForm[];
  isUpdated: boolean;
}

const initialStoredData: StoredData = {
  data: [],
  isUpdated: false,
};

export const formSlice = createSlice({
  name: 'storedData',
  initialState: initialStoredData,
  reducers: {
    pushSubmited: (state, action: PayloadAction<SubmitedForm>) => {
      state.data.push(action.payload);
      state.isUpdated = true;
    },
    outdate: (state) => {
      state.isUpdated = false;
    },
  },
});

export default formSlice.reducer;
