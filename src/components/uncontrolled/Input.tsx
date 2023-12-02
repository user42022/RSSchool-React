import { HTMLInputTypeAttribute } from 'react';

interface InputProps {
  labelText: string;
  validationMessage: string;
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
  type: HTMLInputTypeAttribute;
}

const Input = (props: InputProps) => {
  return (
    <>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        autoComplete="off"
        id={props.id}
        type={props.type}
        ref={props.inputRef}
      />
      <div className="validation-message">{props.validationMessage}</div>
    </>
  );
};

export default Input;
