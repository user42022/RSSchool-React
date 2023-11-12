import { useSearchParams } from 'react-router-dom';
import './Card.css';

type CardProps = {
  name: string;
  status: string;
  imageUrl: string;
  id: string;
};

function Card(props: CardProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const showDetailedCard = () => {
    searchParams.set('detailedId', props.id);
    setSearchParams(searchParams);
  };

  return (
    <div className="card" onClick={showDetailedCard}>
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
