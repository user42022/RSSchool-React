import { Component } from 'react';
import SearchForm from './search-form/SearchForm';
import './App.css';
import fetchQuery from '../../api/api';
import { CharacterData } from '../../types/types';

class App extends Component<
  unknown,
  { fetchValue: string; isFetching: boolean; characters: CharacterData[] }
> {
  state = {
    fetchValue: '',
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
                { fetchValue: value, isFetching: true },
                async () => {
                  localStorage.setItem('cachedQuery', this.state.fetchValue);
                  const response = await fetchQuery(this.state.fetchValue);
                  this.setState({ isFetching: false, characters: response });
                }
              );
            }}
          />
        </div>
        <div className="card-wrapper">
          {this.state.characters.length ? (
            this.state.characters.map((character, idx) => (
              <div key={idx}>{character['name']}</div>
            ))
          ) : (
            <div>results not found</div>
          )}
        </div>
      </>
    );
  }
}

export default App;
