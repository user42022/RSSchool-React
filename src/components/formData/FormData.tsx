import { SubmitedForm } from '../store/reducers/FormSlice';

export default (props: Omit<SubmitedForm, 'date'>) => {
  return (
    <div className="submited-form">
      <div>name: {props.name}</div>
      <div>age: {props.age}</div>
      <div>email: {props.email}</div>
      <div>password: {props.password}</div>
      <div>gender: {props.gender}</div>
      <div>accepted T&C: {props.accept}</div>
      <div>country: {props.country}</div>
      <img src={props.image instanceof ArrayBuffer ? '' : props.image || ''} />
    </div>
  );
};
