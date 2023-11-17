import { useSearchParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import { charactersSlice } from '../../store/reducers/CharactersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useGetDetailedInfoByIdQuery } from '../../../api/services';
import { useEffect } from 'react';
import './Detailed.css';

function Detailed() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { actions } = charactersSlice;
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.charactersReducer);

  const { data, isFetching, isSuccess } = useGetDetailedInfoByIdQuery(
    state.detailedCharacterId!
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(actions.updateDetailedInfo(data.data));
    }
    dispatch(actions.updateIsLoadingDetailedInfo(isFetching));
  });

  const closeDetailedWindow = () => {
    searchParams.delete('detailedId');
    setSearchParams(searchParams);
  };

  return (
    <div className="detailed-window">
      <div onClick={closeDetailedWindow} className="close-button">
        close
      </div>
      {isFetching ? <Loader /> : ''}
      <div className="character-name">
        name: {state.detailedCharacterInfo?.attributes.name}
      </div>
      <div className="character-status">
        Born:{' '}
        {state.detailedCharacterInfo?.attributes.born
          ? state.detailedCharacterInfo?.attributes.born
          : 'no data'}
      </div>
      <div className="character-status">
        Died:{' '}
        {state.detailedCharacterInfo?.attributes.died
          ? state.detailedCharacterInfo?.attributes.died
          : 'no data'}
      </div>
      <div className="character-status">
        Blood Status:{' '}
        {state.detailedCharacterInfo?.attributes.blood_status
          ? state.detailedCharacterInfo?.attributes.blood_status
          : 'no data'}
      </div>
      <div className="character-status">
        Jobs:{' '}
        {state.detailedCharacterInfo?.attributes.jobs.length
          ? state.detailedCharacterInfo?.attributes.jobs.join(', ')
          : 'no data'}
      </div>
      <div className="character-status">
        Alias names:{' '}
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
