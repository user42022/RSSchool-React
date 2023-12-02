import { useAppSelector } from '../../hooks/redux';

const Main = () => {
  const { data } = useAppSelector((state) => state.formsReducer);
  console.log(data);
  return <></>;
};

export default Main;
