import { Component } from 'react';
import SearchForm from './search-form/SearchForm';
import './App.css';
import getCharacter from '../../api/api';
import { CharacterData } from '../../types/types';
import Card from './card/Card';
import Loader from './loader/Loader';
import ErrorButton from './errorButton/ErrorButton';

class App extends Component {
  state: {
    characterName: string;
    isFetching: boolean;
    characters: CharacterData[];
  } = {
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
