import { Component } from 'react';
import { CardProps } from '../../../types/types';
import './Card.css';

class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card">
        <div className="character-name">name: {this.props.name}</div>
        <div className="character-status">status: {this.props.status}</div>
        <img
          src={this.props.imageUrl}
          alt={`${this.props.name}-image`}
          className="character-image"
        />
      </div>
    );
  }
}

export default Card;
