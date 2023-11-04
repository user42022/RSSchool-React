import './Card.css';

type CardProps = {
  name: string;
  status: string;
  imageUrl: string;
};

function Card(props: CardProps) {
  return (
    <div className="card">
      <div className="character-name">name: {props.name}</div>
      <div className="character-status">status: {props.status}</div>
      <img
        src={props.imageUrl}
        alt={`${props.name}-image`}
        className="character-image"
      />
    </div>
  );
}

export default Card;
