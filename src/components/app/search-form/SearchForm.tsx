import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { charactersSlice } from '../../store/reducers/CharactersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './SearchForm.css';

function SearchForm() {
  const { actions } = charactersSlice;
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.charactersReducer);

  const [searchParams, setSearchParams] = useSearchParams();
  const [characterName, setCharacterName] = useState(state.searchValue);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    actions.updateSearchValue(characterName);
    searchParams.set('characterName', characterName);
    localStorage.setItem('cachedName', characterName);
    searchParams.set('pageNumber', `1`);
    setSearchParams(searchParams);
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setCharacterName(event.currentTarget.value);
  };

  const changePageSize = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(actions.updatePageSize(+event.currentTarget.value || 10));
    searchParams.set('pageNumber', '1');
    setSearchParams(searchParams);
  };

  const showPrevPage = () => {
    searchParams.set('pageNumber', `${state.pageNumber - 1}`);
    setSearchParams(searchParams);
  };

  const showNextPage = () => {
    searchParams.set('pageNumber', `${state.pageNumber + 1}`);
    setSearchParams(searchParams);
  };

  return (
    <form className="search-form" onSubmit={submitForm}>
      <input
        className="search-input"
        value={characterName}
        placeholder="type character name"
        onInput={handleInputChange}
      />
      <button className="search-button">
        <img src="/svg/search.svg" />
      </button>
      <input
        type="number"
        min={1}
        placeholder="pageSize"
        className="page-size"
        onInput={changePageSize}
        value={state.pageSize}
      ></input>
      {state.isCharactersLoading ? (
        ''
      ) : (
        <div className="pagination">
          <button
            className="pagination-button"
            type="button"
            onClick={showPrevPage}
            disabled={state.pageNumber < 2}
          >
            Prev
          </button>
          <div>
            Current: {state.pageNumber}/
            {Math.ceil(state.records / state.pageSize)}
          </div>
          <button
            className="pagination-button"
            type="button"
            onClick={showNextPage}
            disabled={
              state.pageNumber >= Math.ceil(state.records / state.pageSize)
            }
          >
            Next
          </button>
        </div>
      )}
    </form>
  );
}

export default SearchForm;
