import { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component<
  { callback: (value: string) => void },
  { fetchValue: string }
> {
  state = { fetchValue: localStorage.getItem('cachedQuery') || '' };

  componentDidMount() {
    this.props.callback(localStorage.getItem('cachedQuery') || '');
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={(event) => {
          event.preventDefault();
          this.props.callback(this.state.fetchValue);
        }}
      >
        <input
          className="search-input"
          defaultValue={this.state.fetchValue}
          placeholder="type character name"
          onInput={(event) => {
            this.setState({ fetchValue: event.currentTarget.value });
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
