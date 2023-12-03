import { HTMLInputTypeAttribute } from 'react';
import './../style/Inputs.css';

interface InputProps {
  labelText: string;
  validationMessage: string;
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
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
        autoComplete="off"
        id={props.id}
        type={props.type}
        ref={props.inputRef}
      />
      <div className="input__validation-message">{props.validationMessage}</div>
    </div>
  );
};

export default Input;
