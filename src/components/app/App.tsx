import { Component } from 'react';
import SearchForm from './search-form/SearchForm';
import './App.css';

class App extends Component {
  render() {
    return (
    <>
    <div className='search-wrapper'>
      <SearchForm/>
    </div>
    <div className='card-wrapper'/>
    </>
    )
  }
}

export default App;
