import { useContext, useState } from 'react';
import AppContext from '../AppContext/AppContext';
import { useSearchParams } from 'react-router-dom';
import './SearchForm.css';

function SearchForm() {
  const context = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const [characterName, setCharacterName] = useState(
    context?.characterName.value
  );

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (context) {
      searchParams.set('characterName', characterName || '');
      searchParams.set('pageNumber', `${context.currentPage.value}`);
      setSearchParams(searchParams);
    }
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setCharacterName(event.currentTarget.value);
  };

  const changePageSize = (event: React.FormEvent<HTMLInputElement>) => {
    if (context) {
      context.pageSize.setValue(+event.currentTarget.value || 10);
      searchParams.set('pageNumber', '1');
      setSearchParams(searchParams);
    }
  };

  const showPrevPage = () => {
    if (context) {
      searchParams.set('pageNumber', `${context.currentPage.value - 1}`);
      setSearchParams(searchParams);
    }
  };

  const showNextPage = () => {
    if (context) {
      searchParams.set('pageNumber', `${context.currentPage.value + 1}`);
      setSearchParams(searchParams);
    }
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
        value={context?.pageSize.value}
      ></input>
      {context?.isFetching.value ? (
        ''
      ) : (
        <div className="pagination">
          <button
            className="pagination-button"
            type="button"
            onClick={showPrevPage}
            disabled={!!context && context.currentPage.value < 2}
          >
            Prev
          </button>
          <div>
            Current: {context?.currentPage.value}/
            {Math.ceil(
              context ? context.records.value / context.pageSize.value : 0
            )}
          </div>
          <button
            className="pagination-button"
            type="button"
            onClick={showNextPage}
            disabled={
              !!context &&
              context.currentPage.value >=
                Math.ceil(context.records.value / context.pageSize.value)
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
