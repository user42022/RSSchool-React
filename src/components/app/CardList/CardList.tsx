import Loader from '../loader/Loader';
import Card from '../card/Card';
import { CharacterData } from '../../../types/types';
import './CardList.css';

type CardListProps = {
  characterList: CharacterData[];
  isLoading: boolean;
};

function CardList(props: CardListProps) {
  return (
    <div className="card-list">
      {props.isLoading ? <Loader /> : ''}
      {props.characterList.length ? (
        props.characterList.map((character) => (
          <Card
            key={character.id}
            name={character.attributes.name || 'Unknown'}
            status={character.attributes.died ? 'Dead' : 'Alive'}
            imageUrl={
              character.attributes.image || `/svg/no-image-svgrepo-com.svg`
            }
          />
        ))
      ) : (
        <div className="not-found">Results not found</div>
      )}
    </div>
  );
}

export default CardList;
