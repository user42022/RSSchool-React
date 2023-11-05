import { useState } from 'react';
import SearchForm from './search-form/SearchForm';
import getCharacter from '../../api/api';
import CardList from './CardList/CardList';
import ErrorButton from './errorButton/ErrorButton';
import { CharacterData, GetCharacterParams } from '../../types/types';
import './App.css';
// import { useSearchParams } from 'react-router-dom';

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [meta, setMeta] = useState({
    pagination: { current: 0, records: 0 },
    copyright: '',
    generated_at: '',
  });

  const handleSearch = async (searchParams: GetCharacterParams) => {
    setIsFetching(true);
    const { data, meta } = await getCharacter(searchParams);
    localStorage.setItem('cachedName', searchParams.characterName);
    setCharacters(data);
    setMeta(meta);
    setIsFetching(false);
  };

  return (
    <>
      <div className="search-wrapper">
        <SearchForm
          handleSearch={handleSearch}
          meta={meta}
          isFetching={isFetching}
        />
      </div>
      <CardList characterList={characters} isLoading={isFetching} />
      <ErrorButton />
    </>
  );
}

export default App;
