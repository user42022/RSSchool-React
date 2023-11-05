import { useEffect, useRef, useState } from 'react';
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

  const [characterName, setCharacterName] = useState(
    searchParams.get('characterName') ??
      localStorage.getItem('cachedName') ??
      ''
  );
  const [pageSize, setPageSize] = useState(10);

  const [pageNumber, setPageNumber] = useState(
    +(searchParams.get('pageNumber') || 1)
  );

  const ref = useRef<GetCharacterParams>({
    characterName,
    pageNumber,
    pageSize,
  });

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPageNumber(1);
    ref.current.pageNumber = 1;

    searchParams.set('characterName', ref.current.characterName);
    searchParams.set('pageNumber', `${ref.current.pageNumber}`);

    setSearchParams(searchParams);
    props.handleSearch(ref.current);
  };

  const typeText = (event: React.FormEvent<HTMLInputElement>) => {
    setCharacterName(event.currentTarget.value);
    ref.current.characterName = event.currentTarget.value;
  };

  const changePageSize = (event: React.FormEvent<HTMLInputElement>) => {
    setPageSize(+(event.currentTarget.value || 10));
    ref.current.pageSize = +(event.currentTarget.value || 10);
    ref.current.pageNumber = 1;

    if (pageNumber === 1) {
      props.handleSearch({
        characterName,
        pageNumber,
        pageSize: +(event.currentTarget.value || 10),
      });
    } else {
      searchParams.set('pageNumber', `1`);

      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    const query = searchParams.get('characterName');
    const number = searchParams.get('pageNumber');

    if (query === null || number === null) {
      searchParams.set('characterName', ref.current.characterName);
      searchParams.set('pageNumber', `${ref.current.pageNumber}`);
      setSearchParams(searchParams);

      props.handleSearch(ref.current);
    } else if (
      query !== ref.current.characterName ||
      number !== `${ref.current.pageNumber}`
    ) {
      ref.current.characterName = query ?? '';
      ref.current.pageNumber = +(number ?? 1);
      setCharacterName(query ?? '');
      setPageNumber(+(number ?? 1));
    }
    props.handleSearch(ref.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return (
    <form className="search-form" onSubmit={submitForm}>
      <input
        className="search-input"
        value={characterName}
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
        value={pageSize}
      ></input>
      {props.isFetching ? (
        ''
      ) : (
        <div className="pagination">
          <button
            className="pagination-button"
            type="button"
            onClick={() => {
              setPageNumber(pageNumber - 1);
              ref.current.pageNumber--;
              searchParams.set('pageNumber', `${ref.current.pageNumber}`);

              setSearchParams(searchParams);
            }}
            disabled={props.meta.pagination.current < 2}
          >
            Prev
          </button>
          <div>
            Current: {props.meta.pagination.current}/
            {Math.ceil(props.meta.pagination.records / pageSize)}
          </div>
          <button
            className="pagination-button"
            type="button"
            onClick={() => {
              setPageNumber(pageNumber + 1);
              ref.current.pageNumber++;

              searchParams.set('pageNumber', `${ref.current.pageNumber}`);
              setSearchParams(searchParams);
            }}
            disabled={
              props.meta.pagination.current >=
              Math.ceil(props.meta.pagination.records / pageSize)
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
