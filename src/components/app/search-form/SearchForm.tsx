import { Component } from 'react';
import { SearchFormProps, SearchFormState } from '../../../types/types';
import './SearchForm.css';

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  state = { characterName: localStorage.getItem('cachedName') || '' };

  componentDidMount() {
    this.props.callback(localStorage.getItem('cachedName') || '');
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={(event) => {
          event.preventDefault();
          this.props.callback(this.state.characterName);
        }}
      >
        <input
          className="search-input"
          defaultValue={this.state.characterName}
          placeholder="type character name"
          onInput={(event) => {
            this.setState({ characterName: event.currentTarget.value });
          }}
        />
        <button className="search-button">
          <img src="/svg/search.svg" />
        </button>
      </form>
    );
  }
}

export default SearchForm;
