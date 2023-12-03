import './../style/Inputs.css';

interface SelectProps {
  labelText: string;
  id: string;
  inputRef: React.RefObject<HTMLSelectElement>;
  validationMessage: string;
}

const Select = (props: SelectProps) => {
  return (
    <div className="input">
      <label className="input__label" htmlFor={props.id}>
        {props.labelText}
      </label>
      <select
        className="input__field"
        ref={props.inputRef}
        id={props.id}
        defaultValue={''}
      >
        <option value={''} disabled>
          Your gender
        </option>
        <option>Other</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <div className="input__validation-message">{props.validationMessage}</div>
    </div>
  );
};

export default Select;
