import { Component } from 'react';
import Loader from '../loader/Loader';
import Card from '../card/Card';
import { CardListProps } from '../../../types/types';
import './CardList.css';

class CardList extends Component<CardListProps> {
  render() {
    return (
      <div className="card-list">
        {this.props.isLoading ? <Loader /> : ''}
        {this.props.characterList.length ? (
          this.props.characterList.map((character) => (
            <Card
              key={character.id}
              name={character.name}
              status={character.status}
              imageUrl={character.image}
            />
          ))
        ) : (
          <div className="not-found">Results not found</div>
        )}
      </div>
    );
  }
}

export default CardList;
