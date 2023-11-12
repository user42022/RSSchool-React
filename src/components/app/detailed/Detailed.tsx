import { useSearchParams } from 'react-router-dom';
import './Detailed.css';
import { useContext, useEffect, useState } from 'react';
import { getCharacterById } from '../../../api/api';
import Loader from '../loader/Loader';
import { Character } from '../../../types/types';
import AppContext from '../AppContext/AppContext';

function Detailed() {
  const context = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isFetching, setIsFetching] = useState(false);
  const [detailedInfo, setDetailedInfo] = useState<Character>({
    id: '',
    type: '',
    attributes: {
      slug: '',
      alias_names: [],
      animagus: '',
      blood_status: '',
      boggart: '',
      born: '',
      died: '',
      eye_color: '',
      family_members: [],
      gender: '',
      hair_color: '',
      height: '',
      house: '',
      image: '',
      jobs: [],
      marital_status: '',
      name: '',
      nationality: '',
      patronus: '',
      romances: [],
      skin_color: '',
      species: '',
      titles: [],
      wands: [],
      weight: '',
      wiki: '',
    },
    links: {
      self: '',
    },
  });

  const closeDetailedWindow = () => {
    searchParams.delete('detailedId');
    setSearchParams(searchParams);
  };

  const handleSearch = async (searchId: string) => {
    setIsFetching(true);
    const { data } = await getCharacterById([searchId]);
    setIsFetching(false);
    data && setDetailedInfo(data);
  };

  useEffect(() => {
    if (context?.detailed.value) {
      handleSearch(context.detailed.value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context?.detailed.value]);

  return (
    <div className="detailed-window">
      <div onClick={closeDetailedWindow} className="close-button">
        close
      </div>
      {isFetching ? <Loader /> : ''}
      <div className="character-name">name: {detailedInfo.attributes.name}</div>
      <div className="character-status">
        `Born:`{' '}
        {detailedInfo.attributes.born
          ? detailedInfo.attributes.born
          : 'no data'}
      </div>
      <div className="character-status">
        `Died:`{' '}
        {detailedInfo.attributes.died
          ? detailedInfo.attributes.died
          : 'no data'}
      </div>
      <div className="character-status">
        `Blood Status:`{' '}
        {detailedInfo.attributes.blood_status
          ? detailedInfo.attributes.blood_status
          : 'no data'}
      </div>
      <div className="character-status">
        `Jobs:`{' '}
        {detailedInfo.attributes.jobs.length
          ? detailedInfo.attributes.jobs.join(', ')
          : 'no data'}
      </div>
      <div className="character-status">
        `Alias names:`{' '}
        {detailedInfo.attributes.alias_names.length
          ? detailedInfo.attributes.alias_names.join(', ')
          : 'no data'}
      </div>

      <img
        src={detailedInfo.attributes.image || '/svg/no-image-svgrepo-com.svg'}
        alt={`${detailedInfo.attributes.name}-image`}
        className="character-image"
      />
    </div>
  );
}

export default Detailed;
