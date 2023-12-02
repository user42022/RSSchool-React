import './PasswordInput.css';

interface InputProps {
  labelText: string;
  validationMessage: string;
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
  passwordStrength: string;
}

const PasswordInput = (props: InputProps) => {
  return (
    <>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        autoComplete="off"
        id={props.id}
        type="password"
        ref={props.inputRef}
      />
      <div className={`password-strength ${props.passwordStrength}`}></div>
      <div className="validation-message">{props.validationMessage}</div>
    </>
  );
};

export default PasswordInput;
