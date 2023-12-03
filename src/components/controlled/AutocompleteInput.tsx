import { UseFormRegisterReturn } from 'react-hook-form';
import { useAppSelector } from '../../hooks/redux';
import './../style/Inputs.css';

interface AutocompleteInputProps {
  useFormRegisterReturn: UseFormRegisterReturn;
  labelText: string;
  validationMessage: string;
  id: string;
}

const AutocompleteInput = (props: AutocompleteInputProps) => {
  const country_list = useAppSelector((state) => state.countriesReducer);

  return (
    <div className="input">
      <label className="input__label" htmlFor={props.id}>
        {props.labelText}
      </label>
      <input
        className="input__field"
        {...props.useFormRegisterReturn}
        list="country_list"
        id={props.id}
      />
      <datalist id="country_list">
        {country_list.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <div className="input__validation-message">{props.validationMessage}</div>
    </div>
  );
};

export default AutocompleteInput;
