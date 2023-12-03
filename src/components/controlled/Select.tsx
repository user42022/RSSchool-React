import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectProps {
  useFormRegisterReturn: UseFormRegisterReturn;
  labelText: string;
  id: string;
  validationMessage: string;
}

const Select = (props: SelectProps) => {
  return (
    <>
      <label htmlFor={props.id}>{props.labelText}</label>
      <select {...props.useFormRegisterReturn} id={props.id} defaultValue={''}>
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
