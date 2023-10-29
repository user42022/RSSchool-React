import { Component } from 'react';

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
        onSubmit={(event) => {
          event.preventDefault();
          this.props.callback(this.state.fetchValue);
        }}
      >
        <input
          defaultValue={this.state.fetchValue}
          placeholder="type your search"
          onInput={(event) => {
            this.setState({ fetchValue: event.currentTarget.value });
          }}
        />
        <button>Search</button>
      </form>
    );
  }
}

export default SearchForm;
