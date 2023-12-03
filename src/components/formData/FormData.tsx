import { SubmitedForm } from '../store/reducers/FormSlice';
import './FormData.css';

export default (props: Omit<SubmitedForm, 'date'>) => {
  return (
    <div className="submited-form">
      <div className="info">
        <div className="info__text">name: {props.name}</div>
        <div className="info__text">age: {props.age}</div>
        <div className="info__text">email: {props.email}</div>
        <div className="info__text">password: {props.password}</div>
        <div className="info__text">gender: {props.gender}</div>
        <div className="info__text">accepted T&C: {props.accept}</div>
        <div className="info__text">country: {props.country}</div>
      </div>
      <img
        className="image"
        src={props.image instanceof ArrayBuffer ? '' : props.image || ''}
      />
    </div>
  );
};
