import { useEffect, useState } from 'react';
import './SearchForm.css';
import { GetCharacterParams, MetaInfo } from '../../../types/types';
import { useSearchParams } from 'react-router-dom';

type SearchFormProps = {
  handleSearch: (searchParams: GetCharacterParams) => void;
  meta: MetaInfo;
  isFetching: boolean;
};

function SearchForm(props: SearchFormProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('characterName') ??
      localStorage.getItem('cachedName') ??
      ''
  );
  const [pageOptions, setPageOptions] = useState({
    pageSize: 10,
    pageNumber: +(searchParams.get('pageNumber') || 1),
    characterName:
      searchParams.get('characterName') ??
      localStorage.getItem('cachedName') ??
      '',
  });

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPageOptions({
      pageSize: pageOptions.pageSize,
      pageNumber: 1,
      characterName: searchValue,
    });

    searchParams.set('characterName', pageOptions.characterName);
    searchParams.set('pageNumber', `${pageOptions.pageNumber}`);

    setSearchParams(searchParams);
    if (
      searchParams.get('characterName') === pageOptions.characterName &&
      pageOptions.pageNumber === 1
    ) {
      props.handleSearch(pageOptions);
    }
  };

  const typeText = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const changePageSize = (event: React.FormEvent<HTMLInputElement>) => {
    setPageOptions({
      pageSize: +(event.currentTarget.value || pageOptions.pageSize),
      pageNumber: 1,
      characterName: pageOptions.characterName,
    });
  };

  useEffect(() => {
    props.handleSearch(pageOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    searchParams.set('pageNumber', `${pageOptions.pageNumber}`);
    searchParams.set('characterName', `${pageOptions.characterName}`);

    setSearchParams(searchParams);
    props.handleSearch(pageOptions);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageOptions]);

  useEffect(() => {
    setPageOptions({
      pageNumber: +(searchParams.get('pageNumber') ?? 1),
      pageSize: pageOptions.pageSize,
      characterName:
        searchParams.get('characterName') ??
        localStorage.getItem('cachedName') ??
        '',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return (
    <form className="search-form" onSubmit={submitForm}>
      <input
        className="search-input"
        value={searchValue}
        placeholder="type character name"
        onInput={typeText}
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
        value={pageOptions.pageSize}
      ></input>
      {props.isFetching ? (
        ''
      ) : (
        <div className="pagination">
          <button
            className="pagination-button"
            type="button"
            onClick={() => {
              setPageOptions({
                pageNumber: pageOptions.pageNumber - 1,
                pageSize: pageOptions.pageSize,
                characterName: pageOptions.characterName,
              });
            }}
            disabled={props.meta.pagination.current === 1}
          >
            Prev
          </button>
          <div>
            Current: {props.meta.pagination.current}/
            {Math.ceil(props.meta.pagination.records / pageOptions.pageSize)}
          </div>
          <button
            className="pagination-button"
            type="button"
            onClick={() => {
              setPageOptions({
                pageNumber: pageOptions.pageNumber + 1,
                pageSize: pageOptions.pageSize,
                characterName: pageOptions.characterName,
              });
            }}
            disabled={
              props.meta.pagination.current >=
              Math.ceil(props.meta.pagination.records / pageOptions.pageSize)
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
