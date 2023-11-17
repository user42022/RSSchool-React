import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCharacterById } from '../../../api/api';
import Loader from '../loader/Loader';
import { Character } from '../../../types/types';
import './Detailed.css';
import { charactersSlice } from '../../store/reducers/CharactersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

function Detailed() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { actions } = charactersSlice;
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.charactersReducer);

  const initDetailedInfo: Character = {
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
  };

  const closeDetailedWindow = () => {
    searchParams.delete('detailedId');
    setSearchParams(searchParams);
  };

  const handleSearch = async (searchId: string) => {
    dispatch(actions.updateIsLoadingDetailedInfo(true));
    const { data } = await getCharacterById([searchId]);
    dispatch(actions.updateIsLoadingDetailedInfo(false));
    dispatch(actions.updateDetailedInfo(data || initDetailedInfo));
  };

  useEffect(() => {
    handleSearch(state.detailedCharacterId || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.detailedCharacterId]);

  return (
    <div className="detailed-window">
      <div onClick={closeDetailedWindow} className="close-button">
        close
      </div>
      {state.isDetailedInfoLoading ? <Loader /> : ''}
      <div className="character-name">
        name: {state.detailedCharacterInfo?.attributes.name}
      </div>
      <div className="character-status">
        `Born:`{' '}
        {state.detailedCharacterInfo?.attributes.born
          ? state.detailedCharacterInfo?.attributes.born
          : 'no data'}
      </div>
      <div className="character-status">
        `Died:`{' '}
        {state.detailedCharacterInfo?.attributes.died
          ? state.detailedCharacterInfo?.attributes.died
          : 'no data'}
      </div>
      <div className="character-status">
        `Blood Status:`{' '}
        {state.detailedCharacterInfo?.attributes.blood_status
          ? state.detailedCharacterInfo?.attributes.blood_status
          : 'no data'}
      </div>
      <div className="character-status">
        `Jobs:`{' '}
        {state.detailedCharacterInfo?.attributes.jobs.length
          ? state.detailedCharacterInfo?.attributes.jobs.join(', ')
          : 'no data'}
      </div>
      <div className="character-status">
        `Alias names:`{' '}
        {state.detailedCharacterInfo?.attributes.alias_names.length
          ? state.detailedCharacterInfo?.attributes.alias_names.join(', ')
          : 'no data'}
      </div>

      <img
        src={
          state.detailedCharacterInfo?.attributes.image ||
          '/svg/no-image-svgrepo-com.svg'
        }
        alt={`${state.detailedCharacterInfo?.attributes.name}-image`}
        className="character-image"
      />
    </div>
  );
}

export default Detailed;
