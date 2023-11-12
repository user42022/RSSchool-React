import Loader from '../loader/Loader';
import Card from '../card/Card';
import './CardList.css';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext/AppContext';
import { getCharacters } from '../../../api/api';
import { Character } from '../../../types/types';

function CardList() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const context = useContext(AppContext);

  const handleSearch = async () => {
    context?.isFetching.setValue(true);

    const requestParams = {
      'filter[name_cont]': context?.characterName.value || '',
      'page[number]': `${context?.currentPage.value || 1}`,
      'page[size]': `${context?.pageSize.value || 10}`,
    };

    const { data, meta } = await getCharacters(requestParams);
    console.log(data);
    localStorage.setItem('cachedName', requestParams['filter[name_cont]']);
    setCharacters(data);
    context?.records.setValue(meta.pagination.records);
    context?.isFetching.setValue(false);
  };

  useEffect(() => {
    if (context) {
      handleSearch();
      console.log(context);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    context?.pageSize.value,
    context?.characterName.value,
    context?.currentPage.value,
  ]);

  return (
    <div className="card-list" onClickCapture={context?.closeDetailedCard}>
      {context?.isFetching.value ? <Loader /> : ''}
      {characters.length ? (
        characters.map((character) => (
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
