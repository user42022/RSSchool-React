import Loader from '../loader/Loader';
import Card from '../card/Card';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { charactersSlice } from '../../store/reducers/CharactersSlice';
import { useSearchParams } from 'react-router-dom';
import { useGetCharactersQuery } from '../../../api/services';
import { useEffect } from 'react';
import './CardList.css';

function CardList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { actions } = charactersSlice;
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.charactersReducer);

  const requestParams = {
    characterName: state.searchValue || '',
    pageNumber: `${state.pageNumber || 1}`,
    pageSize: `${state.pageSize || 10}`,
  };

  const { data, isFetching, isSuccess } = useGetCharactersQuery(requestParams);

  useEffect(() => {
    if (isSuccess) {
      dispatch(actions.updateCharacters(data));
    }
    dispatch(actions.updateIsLoadingCharacters(isFetching));
  });

  const closeDetailedCard = () => {
    searchParams.delete('detailedId');
    setSearchParams(searchParams);
  };

  return (
    <div className="card-list" onClickCapture={closeDetailedCard}>
      {isFetching ? <Loader /> : ''}
      {data?.data.length ? (
        data.data.map((character) => (
          <Card
            key={character.id}
            id={character.id}
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
