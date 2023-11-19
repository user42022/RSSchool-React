import { useEffect } from 'react';
import SearchForm from './search-form/SearchForm';
import CardList from './CardList/CardList';
import ErrorButton from './errorButton/ErrorButton';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { charactersSlice } from '../store/reducers/CharactersSlice';
import './App.css';

function App() {
  const { actions } = charactersSlice;
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.charactersReducer);

  const [searchParams, setSearchParams] = useSearchParams();

  const closeDetailedCard = () => {
    searchParams.delete('detailedId');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    searchParams.set('characterName', state.searchValue);
    searchParams.set('pageNumber', `${state.pageNumber}`);
    setSearchParams(searchParams, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(actions.updateFromURL(Object.fromEntries(searchParams)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <div className="search-wrapper" onClickCapture={closeDetailedCard}>
        <SearchForm />
      </div>
      <CardList />
      <ErrorButton />
      {state.detailedCharacterId ? <Outlet /> : ''}
    </>
  );
}

export default App;
