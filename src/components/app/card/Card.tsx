import { Component } from 'react';
import './Card.css';

class Card extends Component<{
  name: string;
  status: string;
  imageUrl: string;
}> {
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
