import { Component } from 'react';

class SearchForm extends Component {
    render() {
        return (
        <form>
            <input placeholder='type your search'></input>
            <button>Search</button>
        </form>
        )
    }
}

export default SearchForm