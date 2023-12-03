import { UseFormRegisterReturn } from 'react-hook-form';
import './../style/Inputs.css';

interface SelectProps {
  useFormRegisterReturn: UseFormRegisterReturn;
  labelText: string;
  id: string;
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
        {...props.useFormRegisterReturn}
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
