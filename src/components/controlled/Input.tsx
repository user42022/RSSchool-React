import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  useFormRegisterReturn: UseFormRegisterReturn;
  labelText: string;
  validationMessage: string;
  id: string;
  type: HTMLInputTypeAttribute;
}

const Input = (props: InputProps) => {
  return (
    <>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        {...props.useFormRegisterReturn}
        autoComplete="off"
        id={props.id}
        type={props.type}
      />
      <div className="validation-message">{props.validationMessage}</div>
    </>
  );
};

export default Input;
