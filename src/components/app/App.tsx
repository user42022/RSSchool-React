import { useState } from 'react';
import SearchForm from './search-form/SearchForm';
import getCharacter from '../../api/api';
import CardList from './CardList/CardList';
import ErrorButton from './errorButton/ErrorButton';
import { CharacterData, GetCharacterParams } from '../../types/types';
import './App.css';

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [characters, setCharacters] = useState<CharacterData[]>([]);

  const handleSearch = async (searchParams: GetCharacterParams) => {
    setIsFetching(true);
    const response = await getCharacter(searchParams);
    localStorage.setItem('cachedName', searchParams.characterName);
    setCharacters(response);
    setIsFetching(false);
  };

  return (
    <>
      <div className="search-wrapper">
        <SearchForm handleSearch={handleSearch} />
      </div>
      <CardList characterList={characters} isLoading={isFetching} />
      <ErrorButton />
    </>
  );
}

export default App;
