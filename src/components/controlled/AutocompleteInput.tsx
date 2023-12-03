import { UseFormRegisterReturn } from 'react-hook-form';
import { useAppSelector } from '../../hooks/redux';

interface AutocompleteInputProps {
  useFormRegisterReturn: UseFormRegisterReturn;
  labelText: string;
  validationMessage: string;
  id: string;
}

const AutocompleteInput = (props: AutocompleteInputProps) => {
  const country_list = useAppSelector((state) => state.countriesReducer);

  return (
    <>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        {...props.useFormRegisterReturn}
        list="country_list"
        id={props.id}
      />
      <datalist id="country_list">
        {country_list.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <div className="validation-message">{props.validationMessage}</div>
    </>
  );
};

export default AutocompleteInput;
