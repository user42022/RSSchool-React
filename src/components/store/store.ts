import { combineReducers, configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../store/reducers/CharactersSlice';

const rootReducer = combineReducers({
  charactersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
