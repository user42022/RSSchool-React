import { useEffect, useState } from 'react';
import './SearchForm.css';
import { GetCharacterParams } from '../../../types/types';

type SearchFormProps = {
  handleSearch: (searchParams: GetCharacterParams) => void;
};

function SearchForm(props: SearchFormProps) {
  const [characterName, setCharacterName] = useState(
    localStorage.getItem('cachedName') || ''
  );

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleSearch({
      pageNumber: 1,
      pageSize: 10,
      characterName: characterName,
    });
  };

  const typeText = (event: React.FormEvent<HTMLInputElement>) => {
    setCharacterName(event.currentTarget.value);
  };

  useEffect(() => {
    props.handleSearch({
      pageNumber: 1,
      pageSize: 10,
      characterName: localStorage.getItem('cachedName') || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="search-form" onSubmit={submitForm}>
      <input
        className="search-input"
        defaultValue={characterName}
        placeholder="type character name"
        onInput={typeText}
      />
      <button className="search-button">
        <img src="/svg/search.svg" />
      </button>
    </form>
  );
}

export default SearchForm;
