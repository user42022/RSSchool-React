import { useEffect, useState } from 'react';
import SearchForm from './search-form/SearchForm';
import CardList from './CardList/CardList';
import ErrorButton from './errorButton/ErrorButton';
import { Outlet, useSearchParams } from 'react-router-dom';
import AppContext from './AppContext/AppContext';
import './App.css';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    +(searchParams.get('pageNumber') || 1)
  );
  const [characterName, setCharacterName] = useState(
    searchParams.get('characterName') ??
      localStorage.getItem('cachedName') ??
      ''
  );
  const [pageSize, setPageSize] = useState(10);
  const [detailed, setDetailed] = useState(searchParams.get('detailedId'));
  const [records, setRecords] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  // const searchWrapper = useRef<HTMLDivElement>(null)

  const closeDetailedCard = () => {
    searchParams.delete('detailedId');
    setSearchParams(searchParams);
  };

  const context = {
    currentPage: {
      value: currentPage,
      setValue: setCurrentPage,
    },
    characterName: {
      value: characterName,
      setValue: setCharacterName,
    },
    pageSize: {
      value: pageSize,
      setValue: setPageSize,
    },
    detailed: {
      value: detailed,
      setValue: setDetailed,
    },
    records: {
      value: records,
      setValue: setRecords,
    },
    isFetching: {
      value: isFetching,
      setValue: setIsFetching,
    },
    closeDetailedCard,
  };

  useEffect(() => {
    setCharacterName(
      searchParams.get('characterName') ??
        localStorage.getItem('cachedName') ??
        ''
    );
    setCurrentPage(+(searchParams.get('pageNumber') || 1));
    setDetailed(searchParams.get('detailedId'));
  }, [searchParams]);

  useEffect(() => {
    searchParams.set('characterName', characterName);
    searchParams.set('pageNumber', `${currentPage}`);
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={context}>
      <div className="search-wrapper" onClickCapture={closeDetailedCard}>
        <SearchForm />
      </div>
      <CardList />
      <ErrorButton />
      {detailed ? <Outlet /> : ''}
    </AppContext.Provider>
  );
}

export default App;
