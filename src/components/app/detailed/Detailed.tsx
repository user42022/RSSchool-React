import { useSearchParams } from 'react-router-dom';
import './Detailed.css';
import { useEffect, useRef, useState } from 'react';
import getCharacter from '../../../api/api';
import { CharacterData } from './../../../types/types';
import Loader from '../loader/Loader';

function Detailed() {
  const ref = useRef<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isFetching, setIsFetching] = useState(false);
  const [detailedInfo, setDetailedInfo] = useState<CharacterData>({
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
    ref.current = null;
  };

  const handleSearch = async (searchId: string) => {
    setIsFetching(true);
    const { data } = await getCharacter<CharacterData>(searchId);
    setIsFetching(false);
    setDetailedInfo(data);
  };

  useEffect(() => {
    const id = searchParams.get('detailedId');
    if (ref.current !== id || ref.current === null) {
      ref.current = id;
      handleSearch(ref.current || '');
    } else {
      console.log('was empty ref');
    }
  }, [searchParams]);

  if (searchParams.get('detailedId') === null) {
    return <></>;
  } else {
    return (
      <div className="detailed-window">
        <div onClick={closeDetailedWindow} className="close-button">
          close
        </div>
        {isFetching ? <Loader /> : ''}
        {/* <div>{`${JSON.stringify(detailedInfo)}`}</div> */}
        <div className="character-name">
          name: {detailedInfo.attributes.name}
        </div>
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

  // return (
  // 	<>
  // { searchParams.get('detailedId') !== null ?
  //   <div className="detailed-window">
  // 		<div onClick={closeDetailedWindow}>close</div>
  //       {isFetching ? <Loader/> : ''}
  //       <div className="character-name">name: {detailedInfo.attributes.name}</div>
  //       <div className="character-status">`Born:` {detailedInfo.attributes.born ? detailedInfo.attributes.born : 'no data'}</div>
  //       <div className="character-status">`Died:` {detailedInfo.attributes.died ? detailedInfo.attributes.died : 'no data'}</div>
  //       <div className="character-status">`Blood Status:` {detailedInfo.attributes.blood_status ? detailedInfo.attributes.blood_status : 'no data'}</div>
  //       <div className="character-status">`Jobs:` {detailedInfo.attributes.jobs.length ? detailedInfo.attributes.jobs.join(', ') : 'no data'}</div>
  //       <div className="character-status">`Alias names:` {detailedInfo.attributes.alias_names.length ? detailedInfo.attributes.alias_names.join(', ') : 'no data'}</div>

  //       <img
  //         src={detailedInfo.attributes.image || ''}
  //         alt={`${detailedInfo.attributes.name}-image`}
  //         className="character-image"
  //       />
  //   </div> : ''
  // 	}
  // 	</>
  // )
}

export default Detailed;
