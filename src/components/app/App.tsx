import { Component } from 'react';
import SearchForm from './search-form/SearchForm';
import getCharacter from '../../api/api';
import { AppState } from '../../types/types';
import CardList from './CardList/CardList';
import ErrorButton from './errorButton/ErrorButton';
import './App.css';

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    characterName: '',
    isFetching: false,
    characters: [],
  };

  render() {
    return (
      <>
        <div className="search-wrapper">
          <SearchForm
            callback={(value: string) => {
              this.setState(
                { characterName: value, isFetching: true },
                async () => {
                  localStorage.setItem('cachedName', this.state.characterName);
                  const response = await getCharacter(this.state.characterName);
                  this.setState({ isFetching: false, characters: response });
                }
              );
            }}
          />
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
