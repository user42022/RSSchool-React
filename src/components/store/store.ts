import { combineReducers, configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../store/reducers/CharactersSlice';
import { potterAPI } from '../../api/services';

const rootReducer = combineReducers({
  charactersReducer,
  [potterAPI.reducerPath]: potterAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(potterAPI.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
