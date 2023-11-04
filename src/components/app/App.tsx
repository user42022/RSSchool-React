import { Component } from 'react';
import SearchForm from './search-form/SearchForm';
import getCharacter from '../../api/api';
import CardList from './CardList/CardList';
import ErrorButton from './errorButton/ErrorButton';
import './App.css';
import { CharacterData } from '../../types/types';

export type AppState = {
  characterName: string;
  isFetching: boolean;
  characters: CharacterData[];
};

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    characterName: '',
    isFetching: false,
    characters: [],
  };

  handleSearch = (searchName: string) => {
    this.setState({ characterName: searchName, isFetching: true }, async () => {
      localStorage.setItem('cachedName', this.state.characterName);
      const response = await getCharacter(this.state.characterName);
      this.setState({ isFetching: false, characters: response });
    });
  };

  render() {
    return (
      <>
        <div className="search-wrapper">
          <SearchForm handleSearch={this.handleSearch} />
        </div>
        <CardList
          characterList={this.state.characters}
          isLoading={this.state.isFetching}
        />
        <ErrorButton />
      </>
    );
  }
}

export default App;
