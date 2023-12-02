import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countriesReducer from './reducers/CountriesSlice';
import formsReducer from './reducers/FormSlice';

const rootReducer = combineReducers({
  countriesReducer,
  formsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
