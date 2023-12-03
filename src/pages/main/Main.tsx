import { useEffect } from 'react';
import FormData from '../../components/formData/FormData';
import { formSlice } from '../../components/store/reducers/FormSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './Main.css';

const Main = () => {
  const { data, isUpdated } = useAppSelector((state) => state.formsReducer);
  const dispatch = useAppDispatch();
  const { outdate } = formSlice.actions;

  useEffect(() => {
    setTimeout(() => dispatch(outdate()), 5000);
  }, [dispatch, outdate]);

  return (
    <div className={`info-list ${isUpdated ? 'updated' : ''}`}>
      {[...data].reverse().map((submitedInfo) => (
        <FormData key={submitedInfo.age} {...submitedInfo} />
      ))}
    </div>
  );
};

export default Main;
