import './../style/Inputs.css';

interface InputProps {
  labelText: string;
  validationMessage: string;
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
  passwordStrength: string;
}

const PasswordInput = (props: InputProps) => {
  return (
    <div className="input">
      <label className="input__label" htmlFor={props.id}>
        {props.labelText}
      </label>
      <input
        className="input__label"
        autoComplete="off"
        id={props.id}
        type="password"
        ref={props.inputRef}
      />
      <div className={`password-strength ${props.passwordStrength}`}></div>
      <div className="input__validation-message password-message">
        {props.validationMessage}
      </div>
    </div>
  );
};

export default PasswordInput;
