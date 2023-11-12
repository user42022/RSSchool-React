import { createContext } from 'react';

interface Context {
  currentPage: {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
  };
  characterName: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  };
  pageSize: {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
  };
  detailed: {
    value: string | null;
    setValue: React.Dispatch<React.SetStateAction<string | null>>;
  };
  records: {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
  };
  isFetching: {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  };
  closeDetailedCard: () => void;
}

const AppContext = createContext<Context | null>(null);

export default AppContext;
