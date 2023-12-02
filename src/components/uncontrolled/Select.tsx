interface SelectProps {
  labelText: string;
  id: string;
  inputRef: React.RefObject<HTMLSelectElement>;
  validationMessage: string;
}

const Select = (props: SelectProps) => {
  return (
    <>
      <label htmlFor={props.id}>{props.labelText}</label>
      <select ref={props.inputRef} id={props.id} defaultValue={''}>
        <option value={''} disabled>
          Your gender
        </option>
        <option>Other</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <div className="validation-message">{props.validationMessage}</div>
    </>
  );
};

export default Select;
