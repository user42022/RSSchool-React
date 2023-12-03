import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import './../style/Inputs.css';

interface InputProps {
  useFormRegisterReturn: UseFormRegisterReturn;
  labelText: string;
  validationMessage: string;
  id: string;
  type: HTMLInputTypeAttribute;
}

const Input = (props: InputProps) => {
  return (
    <div className="input">
      <label className="input__label" htmlFor={props.id}>
        {props.labelText}
      </label>
      <input
        className="input__field"
        {...props.useFormRegisterReturn}
        autoComplete="off"
        id={props.id}
        type={props.type}
      />
      <div className="input__validation-message">{props.validationMessage}</div>
    </div>
  );
};

export default Input;
