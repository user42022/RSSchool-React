import Loader from '../loader/Loader';
import Card from '../card/Card';
import { useEffect } from 'react';
import { getCharacters } from '../../../api/api';
import './CardList.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { charactersSlice } from '../../store/reducers/CharactersSlice';
import { useSearchParams } from 'react-router-dom';

function CardList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { actions } = charactersSlice;
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.charactersReducer);

  const handleSearch = async () => {
    dispatch(actions.updateIsLoadingCharacters(true));

    const requestParams = {
      'filter[name_cont]': state.searchValue || '',
      'page[number]': `${state.pageNumber || 1}`,
      'page[size]': `${state.pageSize || 10}`,
    };

    const { data, meta } = await getCharacters(requestParams);

    dispatch(actions.updateCharacters(data));
    dispatch(actions.updateRecords(meta.pagination.records));
    dispatch(actions.updateIsLoadingCharacters(false));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.pageNumber, state.pageSize, state.searchValue]);

  const closeDetailedCard = () => {
    searchParams.delete('detailedId');
    setSearchParams(searchParams);
  };

  return (
    <div className="card-list" onClickCapture={closeDetailedCard}>
      {state.isCharactersLoading ? <Loader /> : ''}
      {state.characters.length ? (
        state.characters.map((character) => (
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
