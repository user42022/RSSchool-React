import { Component } from 'react';
import SearchForm from './search-form/SearchForm';
import getCharacter from '../../api/api';
import { AppState } from '../../types/types';
import Card from './card/Card';
import Loader from './loader/Loader';
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
                  localStorage.setItem('cachedQuery', this.state.characterName);
                  const response = await getCharacter(this.state.characterName);
                  this.setState({ isFetching: false, characters: response });
                }
              );
            }}
          />
        </div>
        <div className="card-wrapper">
          {this.state.isFetching ? <Loader></Loader> : ''}
          {this.state.characters.length ? (
            this.state.characters.map((character, idx) => (
              <Card
                key={idx}
                name={character['name']}
                status={character['status']}
                imageUrl={character['image']}
              ></Card>
            ))
          ) : (
            <div className="not-found">results not found</div>
          )}
        </div>
        <ErrorButton></ErrorButton>
      </>
    );
  }
}

export default App;
