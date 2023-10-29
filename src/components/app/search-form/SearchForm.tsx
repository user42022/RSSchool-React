import { Component } from 'react';
import { SearchFormProps, SearchFormState } from '../../../types/types';
import './SearchForm.css';

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  state = { characterName: localStorage.getItem('cachedName') || '' };

  componentDidMount() {
    this.props.handleSearch(localStorage.getItem('cachedName') || '');
  }

  submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.handleSearch(this.state.characterName);
  };

  typeText = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ characterName: event.currentTarget.value });
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.submitForm}>
        <input
          className="search-input"
          defaultValue={this.state.characterName}
          placeholder="type character name"
          onInput={this.typeText}
        />
        <button className="search-button">
          <img src="/svg/search.svg" />
        </button>
      </form>
    );
  }
}

export default SearchForm;
